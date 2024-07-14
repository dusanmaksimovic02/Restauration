import { MdOutlineAddBox } from "react-icons/md";
import "./MeniKartica.css";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { useAuth } from "../../context/useAuth";
import { OrderItemm } from "../../context/useOrder";

const MeniKartica = (props: MeniKarticaProps) => {
  const { isLoggedIn } = useAuth();

  const item: OrderItemm = {
    id: props.id,
    type: props.type,
    slika: props.pictureURL,
    naziv: props.naziv,
    sastojci: props.sastojci,
    vremePripreme: props.vremePripreme,
    cena: props.cena,
    kolicina: 1,
  };

  return (
    <>
      <div className="meni-kartica">
        <div className="slika">
          <img src={props.pictureURL} alt="" />
        </div>
        <div className="naziv">
          <h1>{props.naziv}</h1>
        </div>
        <div className="sastojci-jela">{props.sastojci}</div>
        <div className="cena-priprema" style={{ display: "flex", gap: "1rem" }}>
          <div className="cena">
            <div className="cena-slova">Cena:</div>
            <div className="cena-broj">{props.cena} dinara</div>
          </div>
          {props.prikaziVremePripreme && (
            <div className="vreme-pripreme">
              <div className="vreme-pripreme-slova">Vreme pripreme:</div>
              <div
                className="vreme-pripreme-broj"
                style={{ paddingTop: "0.5rem", textAlign: "center" }}
              >
                {props.vremePripreme} minuta
              </div>
            </div>
          )}
        </div>
        {isLoggedIn() && (
          <div className="dodaj-u-narudzbinu">
            {props.isItemInOrder(item.id) ? (
              <>
                <IoCheckmarkDoneCircleOutline
                  className="dodaj-icon"
                  onClick={() => props.onRemoveFromOrder(item)}
                />
                <div className="popup">Dodato u narudžbinu</div>
              </>
            ) : (
              <>
                <MdOutlineAddBox
                  className="dodaj-icon"
                  onClick={() => props.onAddToOrder(item)}
                />
                <div className="popup">Dodaj u narudžbinu</div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MeniKartica;

interface MeniKarticaProps {
  id: number;
  pictureURL: string;
  naziv: string;
  sastojci: string;
  cena: number;
  vremePripreme: number;
  type: string;
  onAddToOrder: (item: OrderItemm) => void;
  onRemoveFromOrder: (item: OrderItemm) => void;
  isItemInOrder: (id: number) => boolean;
  prikaziVremePripreme: boolean;
}
