import "./OrderCard.css";

type Props = {
  broj: number;
  datum: Date;
  cena: number;
  sadrzajNarudzbine: string;
  hrana: any[] | null;
  pice: any[] | null;
  sto: any;
};

const OrderCard = (props: Props) => {
  return (
    <div className="order-card">
      <div className="heder">
        <h2>Narudzbina broj {props.broj}</h2>
        <div className="datum">{props.datum.toDateString()}</div>
      </div>
      <hr />
      <div className="sadrzaj-narudzbine">
        <table>
          <thead>
            <tr>
              <th>Naziv</th>
              <th>Kolicina</th>
              <th>Sto</th>
              <th>Cena</th>
            </tr>
          </thead>
          <tbody>
            {props.hrana !== null &&
              props.hrana.map((hrana) => (
                <tr key={hrana.id}>
                  <td>{hrana.hrana.naziv}</td>
                  <td>{hrana.kolicinaZaPripremu}</td>
                  <td>
                    {props.sto.naziv} sa brojem {props.sto.id}
                  </td>
                  <td>{hrana.hrana.cena}</td>
                </tr>
              ))}
            {props.pice !== null &&
              props.pice.map((pice) => (
                <tr key={pice.id}>
                  <td>{pice.pice.naziv}</td>
                  <td>{pice.kolicinaZaPripremu}</td>
                  <td>
                    {props.sto.naziv} sa brojem {props.sto.id}
                  </td>
                  <td>{pice.pice.cena}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <br />
      <div className="cena">
        <h5>Ukupna cena narudzbine je: {props.cena} dinara</h5>
      </div>
    </div>
  );
};

export default OrderCard;
