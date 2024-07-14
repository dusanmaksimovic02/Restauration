import { useState } from "react";
import "./KuvarNotificationCard.css";

type Props = {
  id: number;
  status: number;
  Hrana: any[];
  naslov: string;
  datum: Date;
  promenistatus(id: number, status: number): void;
};

const KuvarNotificationCard = (props: Props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [popupText, setPopupText] = useState("");

  const handleClick = () => {
    setShowDetails(!showDetails);
    setPopupText(
      !showDetails ? "Kliknite da sakrijete hranu" : "Kliknite da vidite hranu"
    );
  };

  const handleMouseEnter = () => {
    setPopupText(
      showDetails ? "Kliknite da sakrijete hranu" : "Kliknite da vidite hranu"
    );
  };

  const handleMouseLeave = () => {
    setPopupText("");
  };

  return (
    <div
      className="notification-card"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {popupText && <div className="popup">{popupText}</div>}
      <div className="heder">
        <h2>{props.naslov}</h2>
        <div className="datum">{props.datum.toDateString()}</div>
      </div>
      <hr />
      <p>Narudzbina broj {props.id}</p>
      <table>
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Sastojci</th>
            <th>Kolicina</th>
          </tr>
        </thead>
        <tbody>
          {showDetails &&
            props.Hrana.map((hrana) => (
              <tr key={hrana.hrana.id}>
                <td>{hrana.hrana.naziv}</td>
                <td>{hrana.hrana.stastojci.join(", ")}</td>
                <td>{hrana.kolicinaZaPripremu}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <br />
      <button
        className="btn btn-outline-light"
        onClick={(e) => {
          e.stopPropagation();
          props.promenistatus(props.id, props.status + 2);
        }}
      >
        Promeni status
      </button>
    </div>
  );
};

export default KuvarNotificationCard;
