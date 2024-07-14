import ZaposleniKartica from "../../components/ZaposleniKartica/ZaposleniKartica";
import "./Zaposleni.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface Zaposlen {
  pictureURL: string;
  ime: string;
  prezime: string;
}

const Zaposleni = () => {
  const [zaposleni, setZaposleni] = useState<Zaposlen[]>([]);
  useEffect(() => {
    const fetchZaposleni = async () => {
      try {
        const response = await axios.get<Zaposlen[]>(
          "http://localhost:5104/User/NonCustomerAndAdminUsers"
        );
        setZaposleni(response.data);
      } catch (err) {
        console.log("Error fetching data");
      }
    };

    fetchZaposleni();
  }, []);

  return (
    <div className="zaposleni">
      {zaposleni.map((zaposlen) => (
        <div className="zaposlen-kartica" key={zaposlen.ime}>
          <ZaposleniKartica
            pictureURL={zaposlen.pictureURL}
            ime={zaposlen.ime}
            prezime={zaposlen.prezime}
          />
        </div>
      ))}
    </div>
  );
};

export default Zaposleni;
