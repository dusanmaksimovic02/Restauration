import { useEffect, useState } from "react";
import MeniKartica from "../../components/MeniKartica/MeniKartica";
import "./Meni.css";
import ReactSearchBox from "react-search-box";
import { OrderItemm, useOrder } from "../../context/useOrder";
import axios from "axios";
import { toast } from "react-toastify";
import loaderGif from "../../icons/Animation.gif";

interface Jelo {
  stastojci: string[];
  vremePripreme: number;
  id: number;
  naziv: string;
  kolicina: number;
  sastojci: string;
  cena: number;
  status: number;
  slikaUrl: string;
}

interface Pice {
  id: number;
  naziv: string;
  kolicina: number;
  cena: number;
  status: number;
  slikaUrl: string;
}

const Meni = () => {
  const [jela, setJela] = useState<Jelo[]>([]);
  const [pica, setPica] = useState<Pice[]>([]);

  useEffect(() => {
    const fetchHrana = async () => {
      setIsLoading(true);
      try {
        const data = await axios.get(`http://localhost:5104/Hrana/Hrana`);
        setJela(data.data);
        console.log(data.data);
      } catch (err) {
        toast.error("ERROR: Greska prilikom preuzimanja jela!");
        return null;
      } finally {
        setIsLoading(false);
      }
    };

    const fetchPica = async () => {
      setIsLoading(true);
      try {
        const data = await axios.get(`http://localhost:5104/Pice/Pice`);
        setPica(data.data);
        console.log(data.data);
      } catch (err) {
        toast.error("ERROR: Greska prilikom preuzimanja pica!");
        return null;
      } finally {
        setIsLoading(false);
      }
    };
    fetchHrana();
    fetchPica();
  }, []);

  const { addToOrder, removeFromOrder, isItemInOrder } = useOrder();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedOption, setSelectedOption] =
    useState<string>("Sortiraj po ceni");
  const [filteredJela, setFilteredJela] = useState<Jelo[]>(jela);
  const [filteredPica, setFilteredPica] = useState<Pice[]>(pica);
  const [showItems, setShowItems] = useState<"jela" | "pica" | "oba">("oba");
  const [checkedJela, setCheckedJela] = useState<boolean>(false);
  const [checkedPica, setCheckedPica] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const dataForSearchBox = [
    ...jela.map((jelo) => ({ key: jelo.naziv, value: jelo.naziv })),
    ...pica.map((pice) => ({ key: pice.naziv, value: pice.naziv })),
  ];

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    setFilteredJela(
      jela.filter((jelo) =>
        jelo.naziv.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    setFilteredPica(
      pica.filter((pice) =>
        pice.naziv.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [jela, pica, searchTerm]);

  useEffect(() => {
    let sortedJela = [...jela];
    let sortedPica = [...pica];

    switch (selectedOption) {
      case "Sortirano opadajuce":
        sortedJela.sort((a, b) => b.cena - a.cena);
        sortedPica.sort((a, b) => b.cena - a.cena);
        break;
      case "Sortirano rastuce":
        sortedJela.sort((a, b) => a.cena - b.cena);
        sortedPica.sort((a, b) => a.cena - b.cena);
        break;
      case "Sortiraj po ceni":
        sortedJela = [...jela];
        sortedPica = [...pica];
        break;
      default:
        break;
    }

    setFilteredJela(sortedJela);
    setFilteredPica(sortedPica);
  }, [jela, pica, selectedOption]);

  const handleJelaCheckboxChange = () => {
    setShowItems(
      !checkedJela === true && checkedPica === false
        ? "jela"
        : !checkedJela === true && checkedPica === true
        ? "oba"
        : !checkedJela === false && checkedPica === true
        ? "pica"
        : "oba"
    );
    setCheckedJela(!checkedJela);
  };

  const handlePicaCheckboxChange = () => {
    setCheckedPica(!checkedPica);
    setShowItems(
      checkedJela === false && !checkedPica === true
        ? "pica"
        : checkedJela === true && !checkedPica === true
        ? "oba"
        : checkedJela === true && !checkedPica === false
        ? "jela"
        : "oba"
    );
  };

  const handleAddToOrder = (item: OrderItemm) => {
    addToOrder(item);
  };

  const handleRemoveFromOrder = (id: number) => {
    removeFromOrder(id);
  };

  const handleIsItemInOrder = (id: number) => {
    return isItemInOrder(id);
  };

  return (
    <div className="meni">
      {isLoading && (
        <div className="loading-overlay">
          <img src={loaderGif} alt="Loading..." className="loader-gif" />
        </div>
      )}
      <div className="sadrzaj-menija">
        <h1 className="naslov">Meni</h1>
        <div className="pretraga">
          <div className="search-box">
            <ReactSearchBox
              placeholder={"Search Menu"}
              data={dataForSearchBox}
              onChange={handleSearchChange}
              onSelect={function (record: {
                item: { key: string; value: string };
              }): void {
                setSearchTerm(record.item.value);
              }}
              inputFontSize="30px"
            />
          </div>
          <div className="sortiraj">
            <div className="prikazi-jela">
              <input
                type="checkbox"
                name="prikaziJela"
                id="prikaziJela"
                onChange={handleJelaCheckboxChange}
                checked={checkedJela}
              />
              <label htmlFor="prikaziJela">Prikaži jela</label>
            </div>
            <div className="prikazi-pica">
              <input
                type="checkbox"
                name="prikaziPica"
                id="prikaziPica"
                onChange={handlePicaCheckboxChange}
                checked={checkedPica}
              />
              <label htmlFor="prikaziPica">Prikaži pića</label>
            </div>
            <div className="dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedOption}
              </button>
              <ul className="dropdown-menu">
                <li
                  className="dropdown-item"
                  onClick={() => handleOptionClick("Sortirano opadajuce")}
                >
                  Opadajuce
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => handleOptionClick("Sortirano rastuce")}
                >
                  Rastuce
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => handleOptionClick("Sortiraj po ceni")}
                >
                  None
                </li>
              </ul>
            </div>
          </div>
        </div>
        {showItems !== "pica" && (
          <div className="jela">
            <h1 className="naslov">Jela</h1>
            {filteredJela.map((jelo, index) => (
              <div className="meni-kartice" key={jelo.id}>
                <MeniKartica
                  pictureURL={jelo.slikaUrl}
                  naziv={jelo.naziv}
                  sastojci={
                    Array.isArray(jelo.stastojci)
                      ? jelo.stastojci.join(", ")
                      : "Sastojci nisu dostupni"
                  }
                  cena={jelo.cena}
                  id={jelo.id}
                  onAddToOrder={handleAddToOrder}
                  onRemoveFromOrder={() => handleRemoveFromOrder(jelo.id)}
                  isItemInOrder={() => handleIsItemInOrder(jelo.id)}
                  vremePripreme={jelo.vremePripreme}
                  prikaziVremePripreme={true}
                  type={"hrana"}
                ></MeniKartica>
              </div>
            ))}
          </div>
        )}
        {showItems !== "jela" && (
          <div className="pica">
            <h1 className="naslov">Pica</h1>
            {filteredPica.map((pice, index) => (
              <div className="meni-kartice" key={pice.id}>
                <MeniKartica
                  pictureURL={pice.slikaUrl}
                  naziv={pice.naziv}
                  sastojci={""}
                  cena={pice.cena}
                  id={jela.length + pice.id}
                  onAddToOrder={handleAddToOrder}
                  onRemoveFromOrder={() =>
                    handleRemoveFromOrder(jela.length + pice.id)
                  }
                  isItemInOrder={() =>
                    handleIsItemInOrder(jela.length + pice.id)
                  }
                  vremePripreme={0}
                  prikaziVremePripreme={false}
                  type={"pice"}
                ></MeniKartica>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Meni;
