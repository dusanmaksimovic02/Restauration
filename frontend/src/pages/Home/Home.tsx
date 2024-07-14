import { NavLink } from "react-router-dom";
import "./Home.css";
import { useEffect, useRef, useState } from "react";
import Kartica from "../../components/Kartica/Kartica";
import axios from "axios";
import { toast } from "react-toastify";
import loaderGif from "../../icons/Animation.gif";

const Home = () => {
  const tanjirRef = useRef<HTMLDivElement>(null);
  const [specificHrana, setSpecificHrana] = useState<any[]>();
  const [specificPica, setSpecificPica] = useState<any[]>();
  const [recenzije, setRecenzije] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchHrana = async () => {
      setIsLoading(true);
      try {
        const data = await axios.get(
          `http://localhost:5104/Hrana/GetSpecificHrana`
        );
        setSpecificHrana(data.data);
      } catch (err) {
        console.error("ERROR: Greska prilikom preuzimanja jela!");
        return null;
      } finally {
        setIsLoading(false);
      }
    };

    const fetchPica = async () => {
      setIsLoading(true);
      try {
        const data = await axios.get(
          `http://localhost:5104/Pice/GetSpecificPice`
        );
        setSpecificPica(data.data);
      } catch (err) {
        console.error("ERROR: Greska prilikom preuzimanja pica!");
        return null;
      } finally {
        setIsLoading(false);
      }
    };

    const fetchRecenzije = async () => {
      setIsLoading(true);
      try {
        const data = await axios.get(
          `http://localhost:5104/Recenzija/Recenzija`
        );

        const recenzije = data.data;

        const sortedRecenzije = recenzije.sort((a: any, b: any) => {
          return b.ocena - a.ocena;
        });

        const topRecenzije = sortedRecenzije.slice(0, 10);
        console.log(topRecenzije);
        console.log(data.data);
        setRecenzije(topRecenzije);
      } catch (err) {
        console.error("ERROR: Greska prilikom preuzimanja pica!");
        return null;
      } finally {
        setIsLoading(false);
      }
    };

    fetchHrana();
    fetchPica();
    fetchRecenzije();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (tanjirRef.current) {
        const top = tanjirRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight) {
          tanjirRef.current.classList.add("tanjir-animate");
          window.removeEventListener("scroll", handleScroll);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isHoveredMusterija, setIsHoveredMusterija] = useState(false);
  const [averageRating, setAverageRating] = useState<number | null>(null);

  const handleMouseEnterMusterija = () => {
    setIsHoveredMusterija(true);
  };

  const handleMouseLeaveMusterija = () => {
    setIsHoveredMusterija(false);
  };

  const [isHoveredHrana, setIsHoveredHrana] = useState(false);

  const handleMouseEnterHrana = () => {
    setIsHoveredHrana(true);
    console.log("enter mause hrana");
  };

  const handleMouseLeaveHrana = () => {
    setIsHoveredHrana(false);
    console.log("leave mause hrana");
  };

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5104/Recenzija/ProsecnaOcena"
        );
        setAverageRating(response.data);
      } catch (error) {
        console.error("Error fetching average rating:", error);
        toast.error("GRESKA" + error);
      }
    };

    fetchAverageRating();
  }, []);

  return (
    <div className="home">
      {isLoading && (
        <div className="loading-overlay">
          <img src={loaderGif} alt="Loading..." className="loader-gif" />
        </div>
      )}
      <div className="background">
        <div className="welcome">Welcome to Restauration</div>
        <div className="informacije">
          Vaša oaza ukusa i elegancije. Prepustite se našoj kreativnoj kuhinji,
          uživajte u svakom zalogaju obasjanom pažljivo odabranim sastojcima i
          autentičnim ukusima. Neka vaša gastronomska avantura započne ovde, gde
          svaki obrok postaje nezaboravno iskustvo.
        </div>
      </div>
      <div className="naruci bg-dark">
        <div className="levi">
          <h4>Gladan si?</h4>
          <h1>Šta čekas!</h1>
          <h5>Naruči i čeka te hrana na stolu!</h5>
          <NavLink className="btn btn-outline-light" to={"/meni"}>
            Pogledaj meni
          </NavLink>
        </div>
        <div className="desni">
          <div className={`tanjir`} ref={tanjirRef}></div>
        </div>
      </div>
      <div className="zadovoljne-musterije bg-dark">
        <h1>Zadovoljne mušterije</h1>
        <div className={`kartice ${isHoveredMusterija ? "paused" : ""}`}>
          {recenzije.map((recenzija) => (
            <div
              key={recenzija.naslov}
              onMouseEnter={handleMouseEnterMusterija}
              onMouseLeave={handleMouseLeaveMusterija}
            >
              <Kartica
                pictureURL={""}
                tittle={recenzija.naslov}
                text={recenzija.tekst}
              />
            </div>
          ))}
        </div>

        <NavLink className="btn btn-outline-light" to={"/recenzije"}>
          Pogledaj ostale recenzije
        </NavLink>
        <div className="prosecna-recenzija bg-dark">
          {averageRating !== null && (
            <div>
              <div>Prosečna ocena restorana: {averageRating.toFixed(1)}</div>
              <div className="recenzije-ocena">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={
                      i < Math.round(averageRating)
                        ? "zvezdica puna"
                        : "zvezdica prazna"
                    }
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="preporuka-restorana bg-dark">
        <h1>Naša preporuka</h1>
        <div
          className={`kartice-hrana ${isHoveredHrana ? "paused-hrana" : ""}`}
        >
          {specificHrana?.map((jelo) => (
            <div
              key={jelo.naziv}
              onMouseEnter={handleMouseEnterHrana}
              onMouseLeave={handleMouseLeaveHrana}
            >
              <Kartica
                pictureURL={jelo.slikaUrl}
                tittle={jelo.naziv}
                text={
                  Array.isArray(jelo.stastojci)
                    ? jelo.stastojci.join(", ")
                    : "Sastojci nisu dostupni"
                }
              />
            </div>
          ))}
          {specificPica?.map((pice) => (
            <div
              key={pice.naziv}
              onMouseEnter={handleMouseEnterHrana}
              onMouseLeave={handleMouseLeaveHrana}
            >
              <Kartica
                pictureURL={pice.slikaUrl}
                tittle={pice.naziv}
                text={
                  Array.isArray(pice.stastojci)
                    ? pice.stastojci.join(", ")
                    : "Sastojci nisu dostupni"
                }
              />
            </div>
          ))}
        </div>
        <NavLink className="btn btn-outline-light" to={"/meni"}>
          Pogledaj ostatak menija
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
