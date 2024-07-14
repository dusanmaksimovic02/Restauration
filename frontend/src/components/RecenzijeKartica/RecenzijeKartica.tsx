import "./RecenzijeKartica.css";
import React, { useState } from "react";

interface RecenzijeKarticaProps {
  username: string;
  datumPostavljanja: string;
  ocena: number;
  naslov: string;
  tekst: string;
  dodajRecenziju: (recenzija: Recenzija) => void;
}

interface Recenzija {
  username: string;
  datumPostavljanja: string;
  ocena: number;
  naslov: string;
  tekst: string;
}

const RecenzijeKartica: React.FC<RecenzijeKarticaProps> = ({
  username,
  datumPostavljanja,
  naslov,
  tekst: tekstRecenzije,
  dodajRecenziju,
}) => {
  const [ocena, setOcena] = useState<number>(0);
  const [naslovRecenzije, setNaslovRecenzije] = useState<string>(naslov);
  const [tekstRecenzijeInput, setTekstRecenzijeInput] =
    useState<string>(tekstRecenzije);

  const postaviOcenu = (novaOcena: number) => {
    setOcena(novaOcena);
  };

  const postaviRecenziju = () => {
    const novaRecenzija = {
      username: username,
      datumPostavljanja: datumPostavljanja,
      ocena,
      naslov: naslovRecenzije,
      tekst: tekstRecenzijeInput,
    };
    dodajRecenziju(novaRecenzija);
    setNaslovRecenzije("");
    setTekstRecenzijeInput("");
    setOcena(0);
  };

  const handleTekstRecenzijeChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (e.target.value.length <= 400) {
      setTekstRecenzijeInput(e.target.value);
    }
  };

  return (
    <div className="recenzije-kartica bg-dark">
      <div className="random">
        <div className="recenzije-header">
          <div className="recenzije-user-info">
            <div className="recenzije-username">{username}</div>
            <div className="recenzije-datum">{datumPostavljanja}</div>
          </div>
          <div className="recenzije-ocena">
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={i < ocena ? "zvezdica puna" : "zvezdica prazna"}
                onClick={() => postaviOcenu(i + 1)}
              >
                ★
              </span>
            ))}
          </div>
        </div>
        <div className="recenzije-naslov">
          <input
            type="text"
            className="naslovRecenzije"
            value={naslovRecenzije}
            onChange={(e) => setNaslovRecenzije(e.target.value)}
            placeholder="Unesite naslov"
          />
        </div>
        <div className="recenzije-tekst">
          <textarea
            className="recenzijatext"
            value={tekstRecenzijeInput}
            onChange={handleTekstRecenzijeChange}
            placeholder="Unesite tekst recenzije"
          />
        </div>
        <div>{tekstRecenzijeInput.length}/400</div>
        <div className="random">
          <button
            onClick={postaviRecenziju}
            type="button"
            className="btn btn-primary postavi-recenziju-btn"
          >
            Postavi Recenziju
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecenzijeKartica;
