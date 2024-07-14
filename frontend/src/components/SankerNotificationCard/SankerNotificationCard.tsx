import { useState } from "react";
import "./SankerNotificationCard.css";

type Props = {
  id: number;
  status: number;
  pica: any[];
  naslov: string;
  datum: Date;
  promenistatus(id: number, status: number): void;
};

const SankerNotificationCard = (props: Props) => {
  const [showDetails, setShowDetails] = useState(false);
  const [popupText, setPopupText] = useState("");

  const handleClick = () => {
    setShowDetails(!showDetails);
    setPopupText(
      !showDetails ? "Kliknite da sakrijete pića" : "Kliknite da vidite pića"
    );
  };

  const handleMouseEnter = () => {
    setPopupText(
      showDetails ? "Kliknite da sakrijete pića" : "Kliknite da vidite pića"
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
        <div className="datum">{props.datum.toLocaleString()}</div>
      </div>
      <hr />
      <p>Narudzbina broj {props.id}</p>
      <table>
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Kolicina</th>
          </tr>
        </thead>
        <tbody>
          {showDetails &&
            props.pica.map((pica) => (
              <tr key={pica.pice.id}>
                <td>{pica.pice.naziv}</td>
                <td>{pica.kolicinaZaPripremu}</td>
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

export default SankerNotificationCard;
