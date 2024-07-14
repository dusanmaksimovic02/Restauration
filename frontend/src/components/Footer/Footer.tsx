import { NavLink } from "react-router-dom";
import "./Footer.css";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { IoIosMail, IoMdCloseCircle } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdPhoneInTalk } from "react-icons/md";
import { useState } from "react";
import MapComponent from "./MapComponent";

const Footer = () => {
  const openingHours = [
    { day: "Monday", hour: "08:00 - 23:00" },
    { day: "Tuesday", hour: "08:00 - 23:00" },
    { day: "Wednesday", hour: "08:00 - 23:00" },
    { day: "Thursday", hour: "08:00 - 23:00" },
    { day: "Friday", hour: "08:00 - 01:00" },
    { day: "Saturday", hour: "08:00 - 01:00" },
    { day: "Sunday", hour: "Closed" },
  ];

  const [showMap, setShowMap] = useState(false);

  const handleOpenMap = () => {
    setShowMap(true);
  };

  const handleCloseMap = () => {
    setShowMap(false);
  };

  return (
    <footer className="footer  bg-dark">
      <div className="sb-footer">
        <div className="contact">
          <h3 className="h3-font-size">Contact</h3>
          <div
            className="mail"
            onClick={() => {
              window.location.href = "mailto:info@restauration.com";
            }}
          >
            <IoIosMail className="social-media-icon" />
            <span className="font"> info@restauration.com</span>
          </div>
          <div
            className="phone"
            onClick={() => {
              window.location.href = "tel:+3816554997165";
            }}
          >
            <MdPhoneInTalk className="social-media-icon" />
            <span className="font"> +381 6554997165</span>
          </div>
        </div>

        <div className="address">
          <h3 className="h3-font-size">Address</h3>
          <div
            className="adresa"
            onClick={() => {
              handleOpenMap();
            }}
          >
            <FaLocationDot className="social-media-icon" />
            <span className="font">Pobedina 38, Niš</span>
          </div>
        </div>

        {showMap && (
          <div className="map-overlay">
            <IoMdCloseCircle
              className="close-button"
              onClick={() => handleCloseMap()}
            />
            <MapComponent />
          </div>
        )}

        <div className="opening-hour">
          <h3 className="h3-font-size">Opening Hours</h3>
          {openingHours.map((hour) => (
            <div key={hour.day} className="open">
              <div className="day font">{hour.day}:</div>
              <div className="hour font">{hour.hour}</div>
            </div>
          ))}
        </div>

        <div className="restauration">
          <h3 className="h3-font-size">Restauration</h3>
          <NavLink to="/" className="nav-link-footer font">
            Home
          </NavLink>
          <NavLink to="/onama" className="nav-link-footer font ">
            O Nama
          </NavLink>
          <NavLink to="/meni" className="nav-link-footer font">
            Meni
          </NavLink>
          <NavLink to="/zaposleni" className="nav-link-footer font">
            Zaposleni
          </NavLink>
          <NavLink to="/recenzije" className="nav-link-footer font">
            Recenzije
          </NavLink>
        </div>

        <div className="comming-soon">
          <h3 className="h3-font-size">Comming soon on</h3>
          <div className="social-media">
            <div></div>
            <FaSquareInstagram
              className="social-media-icon"
              onClick={() => window.open("https://www.instagram.com/")}
            />
            <FaFacebookSquare
              className="social-media-icon"
              onClick={() => window.open("https://www.facebook.com/")}
            />
            <FaSquareXTwitter
              className="social-media-icon"
              onClick={() => window.open("https://www.twitter.com/")}
            />
            <FaLinkedin
              className="social-media-icon"
              onClick={() => window.open("https://www.linkedin.com/")}
            />
          </div>
        </div>
      </div>
      <div className="sb-footer-below">
        <hr />
        <p>Restauration ©️ by DSV Solution. All right reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
