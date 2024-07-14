import React, { useEffect, useState } from "react";
import RecenzijeKartica from "../../components/RecenzijeKartica/RecenzijeKartica";
import "./Recenzije.css";
import RecenzijeKarticaPostojeci from "../../components/RecenzijeKartica/RecenzijeKarticaPostojeci";
import { useAuth } from "../../context/useAuth";
import axios from "axios";
import { toast } from "react-toastify";

interface Recenzija {
  username: string;
  datumPostavljanja: string;
  ocena: number;
  naslov: string;
  tekst: string;
}

const Recenzije = () => {
  const { isLoggedIn, id } = useAuth();
  const loggedIn = isLoggedIn();
  const currentDate = new Date().toISOString().split("T")[0];
  const [recenzije, setRecenzije] = useState<Recenzija[]>([]);
  const apiUrl = "http://localhost:5104/Recenzija/";
  const userloc = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchRecenzije = async () => {
    try {
      const res = await axios.get(apiUrl + "Recenzija");
      setRecenzije(res.data);
      console.log(res.data);
    } catch (e) {
      console.log("Error fetching reviews:", e);
      toast.error("GRESKA" + e);
    }
  };

  useEffect(() => {
    fetchRecenzije();
    const intervalId = setInterval(fetchRecenzije, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const dodajRecenziju = async (recenzija: Recenzija) => {
    try {
      const osoba = await axios.get(
        `http://localhost:5104/Musterija/GetMusterijaById/${id}`
      );
      console.log(osoba);
      await axios.post(
        apiUrl +
          `DodajRecenziju/${id}/${recenzija.ocena}/${recenzija.naslov}/${recenzija.tekst}/${recenzija.datumPostavljanja}`,
        {}
      );

      fetchRecenzije();
    } catch (e) {
      console.log("Error adding review:", e);
      toast.error("GRESKA" + e);
    }
  };

  return (
    <div className="recenzije">
      <div className="sadrzajRecenzije">
        <div
          className={`dodavanarecenzija ${loggedIn ? "" : "non-interactable"}`}
          title={
            !loggedIn
              ? "Morate biti ulogovani da biste ostavili recenziju."
              : ""
          }
        >
          <h1 className="naslov">Ostavite recenziju</h1>
          {loggedIn && userloc && (
            <RecenzijeKartica
              username={userloc.userName ?? "Nepoznati korisnik"}
              datumPostavljanja={currentDate}
              ocena={0}
              naslov=""
              tekst=""
              dodajRecenziju={dodajRecenziju}
            />
          )}
        </div>
        <div className="korisnickeRecenzije">
          <h1 className="naslovdva">Recenzije ostalih Korisnika</h1>
          {recenzije.map((recenzija, index) => (
            <RecenzijeKarticaPostojeci
              key={index}
              username={recenzija.username}
              datumPostavljanja={recenzija.datumPostavljanja}
              ocena={recenzija.ocena}
              naslov={recenzija.naslov}
              tekstRecenzije={recenzija.tekst}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recenzije;
