import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import { CgProfile } from "react-icons/cg";
import { useEffect } from "react";
import { useAuth } from "../../context/useAuth";
import orderSlika from "../../icons/orderSlika.png";
import { MdAdminPanelSettings } from "react-icons/md";

const Navbar = () => {
  const { isLoggedIn, role } = useAuth();
  const location = useLocation();
  const toNavigate = isLoggedIn() ? "/profil" : "/login";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <NavLink to="/" className="navbar-brand me-auto">
            <div className="logo"></div>
          </NavLink>
          <div
            className="offcanvas offcanvas-end text-bg-dark"
            tabIndex={-1}
            id="offcanvasDarkNavbar"
            aria-labelledby="offcanvasDarkNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
                Restauration
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <NavLink
                    to="/"
                    className="nav-link active mx-lg-2"
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <NavLink to="/onama" className="nav-link mx-lg-2">
                    O Nama
                  </NavLink>
                </li>
                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <NavLink to="/meni" className="nav-link mx-lg-2">
                    Meni
                  </NavLink>
                </li>
                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <NavLink to="/zaposleni" className="nav-link mx-lg-2">
                    Zaposleni
                  </NavLink>
                </li>
                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <NavLink to="/recenzije" className="nav-link mx-lg-2">
                    Recenzije
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          {(role === "Admin" || role === "Manager") && (
            <NavLink to={"/panel"} className="order-button btn btn-light">
              <MdAdminPanelSettings className="login-icon" />
            </NavLink>
          )}
          {isLoggedIn() && (role === "Musterija" || role === "Konobar") && (
            <NavLink to={"/narudzbina"} className="order-button btn btn-light">
              <img src={orderSlika} alt="" className="order-icon" />
            </NavLink>
          )}
          <NavLink to={toNavigate} className="login-button btn btn-primary">
            <CgProfile className="login-icon" />
            <span className="visible">{isLoggedIn() ? "" : "Login"}</span>
          </NavLink>
          <button
            className="navbar-toggler pe-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasDarkNavbar"
            aria-controls="offcanvasDarkNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
