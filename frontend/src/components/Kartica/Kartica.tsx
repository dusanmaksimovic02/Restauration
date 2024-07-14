import "./Kartica.css";

const Kartica = (props: karticaPorps) => {
  return (
    <div className="card">
      <div className="image-box">
        <img
          src={
            props.pictureURL === ""
              ? "https://www.glimpsecorp.com/wp-content/uploads/2017/01/happy-customers-at-a-successful-restaurant.jpg"
              : props.pictureURL
          }
          alt=""
        />
      </div>
      <div className="content">
        <h2>{props.tittle}</h2>
        <p>{props.text}</p>
      </div>
    </div>
  );
};

export default Kartica;

interface karticaPorps {
  pictureURL: string;
  tittle: string;
  text: string;
}
