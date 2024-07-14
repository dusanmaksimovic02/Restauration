import "./KonobarNotificationCard.css";

type Props = {
  id: number;
  status: number;
  naslov: string;
  datum: Date;
  textNotifikacije: string;
  promenistatus(id: number, status: number): void;
};

const KonobarNotificationCard = (props: Props) => {
  return (
    <div className="notification-card">
      <div className="heder">
        <h2>{props.naslov}</h2>
        <div className="datum">{props.datum.toDateString()}</div>
      </div>
      <hr />
      <p className="text-notifikacije">{props.textNotifikacije}</p>
      <button
        className="btn btn-outline-light"
        onClick={() =>
          props.status === 3
            ? props.promenistatus(props.id, props.status + 2)
            : props.promenistatus(props.id, props.status + 1)
        }
      >
        Promeni status
      </button>
    </div>
  );
};

export default KonobarNotificationCard;
