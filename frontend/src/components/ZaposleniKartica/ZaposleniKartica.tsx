import "./ZaposleniKartica.css";

const ZaposleniKartica = (props: ZaposleniKarticaProps) => {
  return (
    <>
      <div className="zaposleni-kartica">
        <div className="slika">
          <img src={props.pictureURL} alt="" />
        </div>
        <div className="ime">
          <h1>{props.ime}</h1>
        </div>
        <div className="prezime">{props.prezime}</div>
      </div>
    </>
  );
};

export default ZaposleniKartica;

interface ZaposleniKarticaProps {
  pictureURL: string;
  ime: string;
  prezime: string;
}
