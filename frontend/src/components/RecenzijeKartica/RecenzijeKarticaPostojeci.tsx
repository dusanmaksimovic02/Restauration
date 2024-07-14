import "./RecenzijeKarticaPostojeci.css";
import React from "react";

interface RecenzijeKarticaPostojeciProps {
  username: string;
  datumPostavljanja: string;
  ocena: number;
  naslov: string;
  tekstRecenzije: string;
}

const RecenzijeKarticaPostojeci: React.FC<RecenzijeKarticaPostojeciProps> = ({
  username,
  datumPostavljanja,
  ocena,
  naslov,
  tekstRecenzije,
}) => {
  return (
    <div className="recenzije-kartica-postojeci bg-dark">
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
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div className="recenzije-naslov">{naslov}</div>
      <div className="recenzije-tekst">{tekstRecenzije}</div>
    </div>
  );
};

export default RecenzijeKarticaPostojeci;
