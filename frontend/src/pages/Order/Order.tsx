import { Fragment } from "react/jsx-runtime";
import OrderItem from "../../components/OrderItem/OrderItem";
import "./Order.css";
import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { OrderItemm, useOrder } from "../../context/useOrder";
import { useAuth } from "../../context/useAuth";
import { toast } from "react-toastify";
import axios from "axios";
import loaderGif from "../../icons/Animation.gif";

type Props = {};

const Order = (props: Props) => {
  const { orderItems, removeFromOrder, emptyOrder } = useOrder();
  const [totalOrderPrice, setTotalOrderPrice] = useState<number>(0);
  const [sto, setSto] = useState<any[]>([]);
  const [zauzetiStolovi, setZauzetiStolovi] = useState<any[]>([]);
  const [selectedSto, setSelectedSto] = useState<any>(null);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const isStoZauzet = (stoId: number) => {
    return zauzetiStolovi.some((zauzetiSto) => zauzetiSto.id === stoId);
  };

  useEffect(() => {
    const fetchStolove = async () => {
      try {
        const data = await axios.get(`http://localhost:5104/Sto/Stolovi`);
        setSto(data.data);
      } catch (err) {
        toast.error("ERROR: Neuspesno preuzimanje stolova");
        return null;
      }
    };

    const fetchZauzeteStolove = async () => {
      try {
        const data = await axios.get(
          `http://localhost:5104/Sto/ZauzetiStolovi`
        );
        setZauzetiStolovi(data.data);
      } catch (err) {
        console.error("ERROR: Neuspesno preuzimanje zauzetih stolovastolova");
        return null;
      }
    };

    fetchStolove();
    fetchZauzeteStolove();
  }, []);

  const recalculateTotalOrderPrice = (newItems: OrderItemm[]) => {
    const newTotal = newItems.reduce(
      (acc, item) => acc + item.cena * item.kolicina,
      0
    );
    setTotalOrderPrice(newTotal);
  };

  const handleQuantityChange = (itemIndex: number, newQuantity: number) => {
    orderItems[itemIndex].kolicina = newQuantity;
    recalculateTotalOrderPrice(orderItems);
  };

  useEffect(() => {
    recalculateTotalOrderPrice(orderItems);
  }, [orderItems]);

  const handleRemoveItem = (itemIndex: number) => {
    removeFromOrder(itemIndex);
    recalculateTotalOrderPrice(orderItems);
  };

  const handleEmptyOrder = () => {
    emptyOrder();
    setTotalOrderPrice(0);
  };

  const handleMakeOrder = async () => {
    if (selectedSto === null) {
      toast.error("ERROR: Niste izabrali sto");
      return;
    }

    const userId =
      user?.id ?? JSON.parse(localStorage.getItem("user") || "{}").id ?? "";

    if (!userId) {
      toast.error("ERROR: Neuspešna autentifikacija korisnika");
      return;
    }

    const sortedOrderItems = [...orderItems].sort(
      (a, b) => b.vremePripreme - a.vremePripreme
    );

    setIsLoading(true);

    const orderData = {
      vremePripreme: sortedOrderItems[0].vremePripreme,
      cena: totalOrderPrice,
      musterijaId: userId,
      sto: { id: selectedSto.id },
      hrana: orderItems
        .filter((item) => item.type === "hrana")
        .map((item) => ({
          id: item.id,
          kolicina: item.kolicina,
        })),
      pice: orderItems
        .filter((item) => item.type === "pice")
        .map((item) => ({ id: item.id - 30, kolicina: item.kolicina })),
      status: 1,
    };

    try {
      const response = await axios.post(
        "http://localhost:5104/Narudzbina/DodajNarudzbinu",
        orderData
      );

      toast.success("Narudžbina uspešno kreirana:");
      console.log(response);
      handleEmptyOrder();
      setSelectedSto(null);
    } catch (error) {
      console.error("ERROR: Greška prilikom kreiranja narudžbine");
      console.error("Greška:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="order">
      {isLoading && (
        <div className="loading-overlay">
          <img src={loaderGif} alt="Loading..." className="loader-gif" />
        </div>
      )}
      <h1>Make your order</h1>
      <div className="order-content">
        <div className="order-items">
          {orderItems.map((item, index) => (
            <Fragment key={index}>
              <div className="order-item-container" key={item.naziv}>
                <OrderItem
                  slika={item.slika}
                  naziv={item.naziv}
                  sastojci={item.sastojci}
                  cena={item.cena}
                  kolicina={item.kolicina}
                  onQuantityChange={function (newQuantity: number): void {
                    handleQuantityChange(index, newQuantity);
                  }}
                ></OrderItem>
                <div className="close-container">
                  <IoCloseSharp
                    className="close-button"
                    onClick={() => handleRemoveItem(item.id)}
                  />
                  <div className="popup">Delete item</div>
                </div>
              </div>
              <hr />
            </Fragment>
          ))}
        </div>
        <div className="end">
          <div className="sto-cena">
            <div className="dodajSto">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-outline-info dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  disabled={orderItems.length === 0}
                >
                  Select Sto
                </button>
                <ul className="dropdown-menu">
                  {sto.map((sto, index) => {
                    const disabled = isStoZauzet(sto.id);
                    return (
                      <li
                        key={index}
                        className={`dropdown-item ${
                          disabled ? "disabled" : ""
                        }`}
                        style={{
                          cursor: disabled ? "not-allowed" : "pointer",
                          color: disabled ? "#aaa" : "inherit",
                        }}
                        onClick={() => {
                          if (!disabled) {
                            setSelectedSto(sto);
                          }
                        }}
                      >
                        {sto.naziv} - Kapacitet: {sto.kapacitet}
                      </li>
                    );
                  })}
                </ul>
              </div>
              {selectedSto ? (
                <p>
                  Izabrani sto: {selectedSto.naziv} (Kapacitet:{" "}
                  {selectedSto.kapacitet})
                </p>
              ) : (
                <p>Niste izabrali sto.</p>
              )}
            </div>
            <p className="total-price">Total order price: {totalOrderPrice}</p>
          </div>
          <hr />
          <div className="buttons">
            <button
              className="empty-order btn btn-outline-danger"
              onClick={handleEmptyOrder}
              disabled={orderItems.length === 0}
            >
              Empty order
            </button>
            <button
              className="make-order btn btn-outline-success"
              onClick={handleMakeOrder}
              disabled={orderItems.length === 0}
            >
              Make order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
