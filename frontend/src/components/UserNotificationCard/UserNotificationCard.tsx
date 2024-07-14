import "./UserNotificationCard.css";

type Props = {
  id: number;
  naslov: string;
  datum: Date;
  textNotifikacije: string;
  status: number;
  promenistatus(id: number, status: number): void;
};

const UserNotificationCard = (props: Props) => {
  return (
    <div className="notification-card">
      <div className="heder">
        <h2>{props.naslov}</h2>
        <div className="datum">{props.datum.toDateString()}</div>
      </div>
      <hr />
      <p className="text-notifikacije">{props.textNotifikacije}</p>
      {props.status === 5 && (
        <button
          className="btn btn-outline-light"
          onClick={() => props.promenistatus(props.id, props.status + 1)}
        >
          Plati narudzbinu
        </button>
      )}
    </div>
  );
};

export default UserNotificationCard;
