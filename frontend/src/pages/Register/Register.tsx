import "./Register.css";
import slika from "../../icons/jelo.jpeg";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb";
import { toast } from "react-toastify";
import { useAuth } from "../../context/useAuth";
import { User } from "../../models/User";
import loaderGif from "../../icons/Animation.gif";

const Register = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>();
  const [password1, setPassword1] = useState<string>();
  const [password2, setPassword2] = useState<string>();
  const [name, setName] = useState<string>();
  const [surname, setSurname] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [pol, setPol] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [city, setCity] = useState<string>();
  const [dateOfBirth, setdateOfBirth] = useState<string>();
  const [phoneNUmber, setPhoneNumber] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { registerUser, id } = useAuth();

  const handleToLoginClick = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  useEffect(() => {
    const forms = document.querySelectorAll(".needs-validation");

    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event: Event) => {
          if (!(form as HTMLFormElement).checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const form = formRef.current;
    if (form && form.checkValidity()) {
      setIsLoading(true);
      try {
        if (password1 !== password2) {
          toast.error("Please enter the same password!");
          return;
        }
        const regUser: User = {
          id: id!,
          email: email!,
          password: password1!,
          name: name!,
          surname: surname!,
          username: username!,
          address: address!,
          city: city!,
          birtdate: dateOfBirth!,
          phone: phoneNUmber!,
          pol: pol!,
        };
        console.log(regUser);
        await registerUser(regUser);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    } else {
      form?.classList.add("was-validated");
    }
  };

  const handlePhoneInput = (e: ChangeEvent<HTMLInputElement>) => {
    let phoneValue = e.target.value;

    if (
      phoneNUmber === "" ||
      phoneNUmber === undefined ||
      phoneNUmber === null
    ) {
      setPhoneNumber("+381" + phoneValue.replace(/[^0-9+]/g, ""));
      phoneValue = "+381" + phoneValue.replace(/[^0-9+]/g, "");
    } else {
      if (phoneValue.indexOf("+") !== 0) {
        phoneValue = phoneValue.replace(/^\+/g, "");
        setPhoneNumber(phoneValue.replace(/^\+/g, ""));
      } else {
        phoneValue = phoneValue.replace(/[^0-9+]/g, "");
        setPhoneNumber(phoneValue.replace(/[^0-9+]/g, ""));
      }
    }

    if (phoneValue.length > 13) {
      setPhoneNumber(phoneValue.slice(0, 13));
    }
  };

  return (
    <div className={`register bg-dark ${isTransitioning ? "transition" : ""}`}>
      {isLoading && (
        <div className="loading-overlay">
          <img src={loaderGif} alt="Loading..." className="loader-gif" />
        </div>
      )}
      <form
        ref={formRef}
        className="register-form needs-validation"
        noValidate
        onSubmit={handleRegisterSubmit}
      >
        <div className="form ">
          <h1>Register</h1>
          <input
            type="email"
            id="email"
            placeholder="E-mail"
            className="form-control"
            autoComplete="true"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="invalid-feedback" style={{ paddingLeft: "100px" }}>
            Please choose a e-mail.
          </div>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password1"
              placeholder="Password"
              className="form-control"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-password"
            >
              {showPassword ? <TbEye /> : <TbEyeOff />}
            </button>
          </div>
          <div className="invalid-feedback" style={{ paddingLeft: "100px" }}>
            Please choose a password.
          </div>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password2"
              placeholder="Password"
              className="form-control"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-password"
            >
              {showPassword ? <TbEye /> : <TbEyeOff />}
            </button>
          </div>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Name"
            autoComplete="true"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div className="invalid-feedback" style={{ paddingLeft: "100px" }}>
            Please choose a name.
          </div>
          <input
            type="text"
            id="surname"
            className="form-control"
            placeholder="Surname"
            autoComplete="true"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
          <div className="invalid-feedback" style={{ paddingLeft: "100px" }}>
            Please choose a surname.
          </div>
          <input
            type="date"
            name="datumRodjenja"
            id="datumRodjenja"
            className="form-control"
            value={dateOfBirth}
            onChange={(e) => setdateOfBirth(e.target.value)}
            placeholder="Birth date"
          />
          <div className="checkboxes form-control">
            <label htmlFor="Pol" className="pol">
              Pol
            </label>
            <div style={{ display: "flex", gap: "1rem" }}>
              <input
                type="radio"
                name="pol"
                id="pol-m"
                value={pol}
                onChange={(e) => setPol("m")}
              />
              <label htmlFor="pol-m">m</label>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <input
                type="radio"
                name="pol"
                id="pol-z"
                value={pol}
                onChange={(e) => setPol("z")}
              />
              <label htmlFor="pol-z">z</label>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <input
                type="radio"
                name="pol"
                id="pol-o"
                value={pol}
                onChange={(e) => setPol("o")}
              />
              <label htmlFor="pol-o">o</label>
            </div>
          </div>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            className="form-control"
            autoComplete="true"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            name="adressa"
            className="form-control"
            id="adresa"
            placeholder="Address"
            autoComplete="true"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="text"
            name="grad"
            className="form-control"
            id="grad"
            placeholder="City"
            autoComplete="true"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <input
            type="tel"
            name="brojTelefona"
            id="brojTelefona"
            placeholder="Phone"
            className="form-control"
            autoComplete="true"
            value={phoneNUmber}
            onChange={handlePhoneInput}
          />
          <button type="submit" className="btn-register">
            Register
          </button>
          <p className="login-link" onClick={handleToLoginClick}>
            Already have an account? Click here
          </p>
        </div>
        <img src={slika} alt=""></img>
      </form>
    </div>
  );
};

export default Register;
