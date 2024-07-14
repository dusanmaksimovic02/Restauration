import { useAuth } from "../../context/useAuth";
import "./Profile.css";
import { TbLogout } from "react-icons/tb";
import { FaUserAlt, FaUserEdit } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import order from "../../icons/order.ico";
import { useEffect, useRef, useState } from "react";
import { EditTextBox, TextBox } from "../../components/TextBox/TextBox";
import OrderCard from "../../components/OrderCard/OrderCard";
import { toast } from "react-toastify";
import loaderGif from "../../icons/Animation.gif";
import axios from "axios";
import KuvarNotificationCard from "../../components/KuvarNotificationCard/KuvarNotificationCard";
import SankerNotificationCard from "../../components/SankerNotificationCard/SankerNotificationCard";
import KonobarNotificationCard from "../../components/KonobarNotificationCard/KonobarNotificationCard";
import UserNotificationCard from "../../components/UserNotificationCard/UserNotificationCard";

type Props = {};

export type Picaa = {
  cena: number;
  id: number;
  kolicina: number;
  naziv: string;
  slikaUrl: string;
};

const Profile = (props: Props) => {
  const { logout, user, role } = useAuth();
  const [form, setForm] = useState<string>("");
  const initialUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [name, setName] = useState<string>(
    initialUser.name ?? user?.name ?? ""
  );
  const [surname, setSurname] = useState<string>(
    initialUser.surname ?? user?.surname ?? ""
  );
  const [email, setEmail] = useState<string>(
    initialUser.email ?? user?.email ?? ""
  );
  const [username, setUsername] = useState<string>(
    initialUser.userName ?? user?.username ?? ""
  );
  const [name1, setName1] = useState<string>(
    initialUser.name ?? user?.name ?? ""
  );
  const [surname1, setSurname1] = useState<string>(
    initialUser.surname ?? user?.surname ?? ""
  );
  const [username1, setUsername1] = useState<string>(
    initialUser.userName ?? user?.username ?? ""
  );
  const [address, setAddress] = useState<string>(
    initialUser.address ?? user?.address ?? ""
  );
  const [city, setCity] = useState<string>(
    initialUser.city ?? user?.city ?? ""
  );
  const [dateOfBirth, setDateOfBirth] = useState<string>(
    initialUser.birtdate ??
      (user?.birtdate
        ? new Date(user.birtdate).toISOString().split("T")[0]
        : "")
  );
  const [phone, setPhone] = useState<string>(
    initialUser.phone ?? user?.phone ?? ""
  );
  const [gender, setGender] = useState<string>(
    initialUser.pol ??
      (user?.pol === "m"
        ? "Male"
        : user?.pol === "z"
        ? "Female"
        : user?.pol === "o"
        ? "Other"
        : "")
  );
  const Id = initialUser.id ?? "";
  const [profilePicture, setProfilePicture] = useState<string>(
    user?.profilePicture ??
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [notificationUser, setNotificationUser] = useState<any[]>([]);
  const [notificationKonobar, setNotificationKonobar] = useState<any[]>([]);
  const [notificationKuvar, setNotificationKuvar] = useState<any[]>([]);
  const [notificationSanker, setNotificationSanker] = useState<any[]>([]);
  const [notificationDostavjene, setNotificationDostavljene] = useState<any[]>(
    []
  );
  const [notificationZaplacanje, setNotificationZaPlacanje] = useState<any[]>(
    []
  );

  useEffect(() => {
    const fetchNotificationsUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5104/Narudzbina/GetSpremne"
        );
        setNotificationUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Greška pri preuzimanju notifikacija");
      }
    };

    role === "Musterija" && fetchNotificationsUser();

    const fetchNotificationDostavljene = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5104/Narudzbina/GetDostavljene"
        );
        setNotificationDostavljene(response.data);
      } catch (error) {
        console.error(
          "ERROR: greska prilikom pribavljanja dostavljenih notifikacija " +
            error
        );
      }
    };

    role === "Musterija" && fetchNotificationDostavljene();

    const fetchNotificationsKonobar = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5104/Narudzbina/GetSpremne"
        );
        setNotificationKonobar(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Greška pri preuzimanju notifikacija");
      }
    };

    role === "Konobar" && fetchNotificationsKonobar();

    const fetchNotificationsZaPlacanje = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5104/Narudzbina/GetZaPlacanje"
        );
        setNotificationZaPlacanje(response.data);
      } catch (error) {
        console.error("Greška pri preuzimanju notifikacija");
      }
    };

    role === "Konobar" && fetchNotificationsZaPlacanje();

    const fetchNotificationsKuvar = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5104/Narudzbina/GetPrimljeneHrana"
        );
        setNotificationKuvar(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Greška pri preuzimanju notifikacija");
      }
    };

    role === "Kuvar" && fetchNotificationsKuvar();

    const fetchNotificationsSanker = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5104/Narudzbina/GetPrimljenePica"
        );
        setNotificationSanker(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Greška pri preuzimanju notifikacija");
      }
    };

    role === "Sanker" && fetchNotificationsSanker();
  });

  const promeniStatus = async (id: number, status: number) => {
    try {
      const response = await axios.put(
        `http://localhost:5104/Narudzbina/${id}/${status}`
      );
      return response;
    } catch (error) {
      console.error("Greška pri promeni statusa");
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await axios.get(
          `http://localhost:5104/Narudzbina/NarudbineMusterije/${Id}`
        );
        setOrders(data.data);
      } catch (err) {
        console.error("ERROR: Failed to get user orders");
        return null;
      }
    };
    role === "Musterija" && fetchOrders();
  }, [Id, role]);

  const handleInputChange = (name: string, value: string) => {
    switch (name) {
      case "Name":
        setName(value);
        break;
      case "Surname":
        setSurname(value);
        break;
      case "Email":
        setEmail(value);
        break;
      case "Username":
        setUsername(value);
        break;
      case "Address":
        setAddress(value);
        break;
      case "City":
        setCity(value);
        break;
      case "Date of birth":
        setDateOfBirth(value);
        break;
      case "Phone":
        setPhone(value);
        break;
      case "Gender":
        setGender(value);
        break;
      default:
        break;
    }
  };

  const handleSubmitChanges = async () => {
    const updatedUser = {
      Ime: name,
      Prezime: surname,
      Username: username,
      Email: email,
      Phone: phone,
      Pol: gender === "Male" ? "m" : gender === "Female" ? "z" : "o",
      DatumRodjenja: dateOfBirth,
      Adresa: address,
      Grad: city,
    };

    setName1(updatedUser.Ime);
    setSurname1(updatedUser.Prezime);
    setUsername1(updatedUser.Username);

    try {
      const a = await axios.put(
        `http://localhost:5104/User/IzmeniKorisnika/${Id}`,
        {
          Ime: name,
          Prezime: surname,
          Username: username,
          Email: email,
          Phone: phone,
          Pol: gender,
          DatumRodjenja: dateOfBirth,
          Adresa: address,
          Grad: city,
        }
      );
      console.log(a);
      toast.success("Uspešno ste ažurirali podatke");
    } catch (e: any) {
      console.error(e);
    } finally {
    }

    const userr = {
      username: updatedUser.Username,
      email: updatedUser.Email,
      name: updatedUser.Ime,
      surname: updatedUser.Prezime,
      birtdate: updatedUser.DatumRodjenja,
      address: updatedUser.Adresa,
      city: updatedUser.Grad,
      phone: updatedUser.Phone,
      pol: updatedUser.Pol,
      id: Id,
    };

    localStorage.setItem("user", JSON.stringify(userr));
    console.log("Ažurirani podaci korisnika:", updatedUser);
  };

  const handleImageHover = () => {
    if (
      profilePicture ===
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png"
    ) {
      const imageElement = document.getElementById(
        "profile-image"
      ) as HTMLImageElement;
      if (imageElement) {
        imageElement.style.cursor = "pointer";
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5104/api/Osoba/upload/${Id}`,
        { file: file }
      );

      const imageUrl = response.data.url;
      setProfilePicture(imageUrl);

      toast.success("Slika je uspešno dodata.");
    } catch (error) {
      toast.error("Došlo je do greške prilikom dodavanja slike." + error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderUserForm = () => {
    return (
      <div className="user-form bg-dark">
        <TextBox name="Name" value={name} />
        <TextBox name="Surname" value={surname} />
        <TextBox name="Email" value={email} />
        <TextBox name="Username" value={username} />
        <TextBox name="Address" value={address} />
        <TextBox name="City" value={city} />
        <TextBox name="Date of birth" value={dateOfBirth} />
        <TextBox name="Phone" value={phone} />
        <TextBox
          name="Gander"
          value={gender === "m" ? "Male" : gender === "z" ? "Female" : "Other"}
        />
      </div>
    );
  };

  const renderEditUserForm = () => {
    return (
      <div className="edit-user-form bg-dark">
        <EditTextBox
          name="Name"
          type="text"
          value={name}
          onChange={(value) => handleInputChange("Name", value)}
        />
        <EditTextBox
          name="Surname"
          type="text"
          value={surname}
          onChange={(value) => handleInputChange("Surname", value)}
        />
        <EditTextBox
          name="Email"
          type="email"
          value={email}
          onChange={(value) => handleInputChange("Email", value)}
        />
        <EditTextBox
          name="Username"
          type="text"
          value={username}
          onChange={(value) => handleInputChange("Username", value)}
        />
        <EditTextBox
          name="Address"
          type="text"
          value={address}
          onChange={(value) => handleInputChange("Address", value)}
        />
        <EditTextBox
          name="City"
          type="text"
          value={city}
          onChange={(value) => handleInputChange("City", value)}
        />
        <EditTextBox
          name="Date of birth"
          type="date"
          value={dateOfBirth}
          onChange={(value) => handleInputChange("Date of birth", value)}
        />
        <EditTextBox
          name="Phone"
          type="tel"
          value={phone}
          onChange={(value) => handleInputChange("Phone", value)}
        />
        <EditTextBox
          name="Gander"
          type="text"
          value={gender}
          onChange={(value) => handleInputChange("Gender", value)}
        />
        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleSubmitChanges}
        >
          Submit changes
        </button>
      </div>
    );
  };

  const renderNotificationForm = () => {
    return (
      <div className="notification bg-dark">
        {role === "Musterija" && (
          <>
            {notificationUser.length > 0 ? (
              notificationUser.map((notification, index) => (
                <div className="notifikacija" key={index}>
                  {notification.musterija.id === Id && (
                    <UserNotificationCard
                      id={notification.id}
                      naslov={"Novo obavestenje"}
                      datum={new Date()}
                      textNotifikacije={`Vasa narudzbina broj ${notification.id} je spremna, konobar ce je uskoro dostaviti!`}
                      status={notification.status}
                      promenistatus={promeniStatus}
                    />
                  )}
                </div>
              ))
            ) : (
              <p>Nemate obavestenja za narudzbine koje vam stizu</p>
            )}
          </>
        )}

        {role === "Musterija" && (
          <>
            {notificationDostavjene.length > 0 ? (
              notificationDostavjene.map((notification, index) => (
                <div className="notifikacija" key={index}>
                  {notification.musterija.id === Id && (
                    <UserNotificationCard
                      id={notification.id}
                      naslov={"Novo obavestenje"}
                      datum={new Date()}
                      textNotifikacije={`Prijatno, nadamo se da uzivate!`}
                      status={notification.status}
                      promenistatus={promeniStatus}
                    />
                  )}
                </div>
              ))
            ) : (
              <p>Nemate obavestenja za placanje narudzbina</p>
            )}
          </>
        )}

        {role === "Konobar" && (
          <>
            {notificationKonobar.length > 0 ? (
              notificationKonobar.map((notification, index) => (
                <div className="notifikacija" key={index}>
                  <KonobarNotificationCard
                    naslov={"Novo obavestenje"}
                    datum={new Date()}
                    textNotifikacije={`Spremna je narudzbina broj ${notification.id} za sto ${notification.sto.naziv} sa brojem ${notification.sto.id}`}
                    promenistatus={promeniStatus}
                    id={notification.id}
                    status={notification.status}
                  />
                </div>
              ))
            ) : (
              <p>Nemate obavestenja za narudzbine</p>
            )}
          </>
        )}

        {role === "Konobar" && (
          <>
            {notificationZaplacanje.length > 0 ? (
              notificationZaplacanje.map((notification, index) => (
                <div className="notifikacija" key={index}>
                  <KonobarNotificationCard
                    naslov={"Novo obavestenje za placnje"}
                    datum={new Date()}
                    textNotifikacije={`Musterije za stolom ${notification.sto.naziv} sa brojem ${notification.sto.id} zele da plate narudzbinu broj ${notification.id}, ukupna cena narudzbine je ${notification.cena}`}
                    promenistatus={promeniStatus}
                    id={notification.id}
                    status={notification.status}
                  />
                </div>
              ))
            ) : (
              <p>Nemate obavestenja za placanje</p>
            )}
          </>
        )}

        {role === "Kuvar" && (
          <>
            {notificationKuvar.length > 0 ? (
              notificationKuvar.map((notification, index) => (
                <div className="notifikacija" key={index}>
                  <KuvarNotificationCard
                    naslov={"Nova narudzbina"}
                    datum={new Date(2024, 5, 14)}
                    promenistatus={promeniStatus}
                    id={notification.id}
                    status={notification.status}
                    Hrana={notification.hrana}
                  />
                </div>
              ))
            ) : (
              <p>Nemate obavestenja</p>
            )}
          </>
        )}

        {role === "Sanker" && (
          <>
            {notificationSanker.length > 0 ? (
              notificationSanker.map((notification, index) => (
                <div className="notifikacija" key={index}>
                  <SankerNotificationCard
                    naslov={"Nova narudzbina"}
                    datum={new Date(2024, 5, 14)}
                    promenistatus={promeniStatus}
                    id={notification.id}
                    status={notification.status}
                    pica={notification.pice}
                  />
                </div>
              ))
            ) : (
              <p>Nemate obavestenja</p>
            )}
          </>
        )}
      </div>
    );
  };

  const renderOrdersForm = () => {
    return (
      <div className="orders bg-dark">
        {orders.length === 0 ? (
          <div>JOS UVEK NEMATE NARUDZBINE</div>
        ) : (
          orders.map((order, index) => (
            <div className="orders-card" key={index}>
              <OrderCard
                broj={order.id}
                datum={new Date()}
                cena={order.cena}
                sadrzajNarudzbine={order.sadrzajNarudzbine}
                hrana={order.hrana}
                pice={order.pice}
                sto={order.sto}
              />
            </div>
          ))
        )}
      </div>
    );
  };

  const renderForm = () => {
    switch (form) {
      case "user":
        return renderUserForm();
      case "editUser":
        return renderEditUserForm();
      case "notification":
        return renderNotificationForm();
      case "orders":
        return renderOrdersForm();
      default:
        return renderUserForm();
    }
  };

  const renderSidebar = () => {
    return (
      <>
        <div className="profil">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <img
            src={profilePicture}
            alt="slika"
            id="profile-image"
            onMouseEnter={handleImageHover}
            onClick={() => fileInputRef.current?.click()}
          />
          <h3 className="user-fullname">
            {name1} {surname1}
          </h3>
          <h4 className="username">{username1}</h4>
        </div>
        <hr />
        <div className="menu-items">
          <div className="user-information" onClick={() => setForm("user")}>
            <FaUserAlt className="icon" />
            <p>User information</p>
          </div>
          <hr />
          <div className="edit-user" onClick={() => setForm("editUser")}>
            <FaUserEdit className="icon" />
            <p>Edit User information</p>
          </div>
          <hr />
          {role !== "Admin" && role !== "Manager" && (
            <>
              <div
                className="notification"
                onClick={() => setForm("notification")}
              >
                <IoIosNotifications className="icon" />
                <p>Notification</p>
              </div>
              <hr />
            </>
          )}
          {role === "Musterija" && (
            <>
              <div className="orders" onClick={() => setForm("orders")}>
                <img className="icon" src={order} alt="" />
                <p>Orders</p>
              </div>
              <hr />
            </>
          )}
          <div className="logout" onClick={logout}>
            <TbLogout className="icon" />
            <p>Logout</p>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="profile-page">
      {isLoading && (
        <div className="loading-overlay">
          <img src={loaderGif} alt="Loading..." className="loader-gif" />
        </div>
      )}
      <div className="sidebar bg-dark">{renderSidebar()}</div>
      <div className="forma">{renderForm()}</div>
    </div>
  );
};

export default Profile;
