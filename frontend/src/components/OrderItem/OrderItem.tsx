import { useEffect, useState } from "react";
import "./OrderItem.css";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

type Props = {
  slika: string;
  naziv: string;
  sastojci: string;
  cena: number;
  kolicina: number;
  onQuantityChange: (newQuantity: number) => void;
};

const OrderItem = (props: Props) => {
  let [kolicina, setKolicina] = useState<number>(1);

  useEffect(() => {
    props.onQuantityChange(kolicina);
  }, [kolicina, props]);

  const handlePlusClick = () => {
    if (kolicina === 5) {
      return;
    }
    setKolicina(kolicina + 1);
  };

  const handleMinusClick = () => {
    if (kolicina === 1) {
      return;
    }
    setKolicina(kolicina - 1);
  };

  return (
    <div className="order-item">
      <img src={props.slika} alt="" />
      <h3 className="naziv">{props.naziv}</h3>
      <p className="sastojci">{props.sastojci}</p>
      <div className="cena">
        <h5>Price</h5>
        <p>{props.cena}</p>
      </div>
      <div className="kolicina">
        <h5>Kolicina</h5>
        <div className="edit-kolicina">
          <button
            className="btn-minus btn btn-outline-danger"
            onClick={handleMinusClick}
          >
            <FaMinus />
          </button>
          <b className="kolicina-broj">{kolicina}</b>
          <button
            className="btn-plus btn btn-outline-success"
            onClick={handlePlusClick}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <div className="total-price">
        <h5>Total price</h5>
        <p>{props.cena * kolicina}</p>
      </div>
    </div>
  );
};

export default OrderItem;
