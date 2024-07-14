import "./Login.css";
import slika from "../../icons/jelo.jpeg";
import { useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useRef, useState } from "react";
import { TbEye, TbEyeOff } from "react-icons/tb";
import { useAuth } from "../../context/useAuth";
import loaderGif from "../../icons/Animation.gif";

const Login = () => {
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const { loginUser } = useAuth();

  const handleRegisterClick = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      navigate("/register");
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

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const form = formRef.current;
    if (form && form.checkValidity()) {
      setIsLoading(true);
      try {
        await loginUser(username, password);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    } else {
      form?.classList.add("was-validated");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={`login bg-dark ${isTransitioning ? "transition-log" : ""}`}>
      {isLoading && (
        <div className="loading-overlay">
          <img src={loaderGif} alt="Loading..." className="loader-gif" />
        </div>
      )}
      <form ref={formRef} className="login-form needs-validation" noValidate>
        <img src={slika} alt=""></img>
        <div className="form">
          <h1>Login</h1>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="invalid-feedback" style={{ paddingLeft: "100px" }}>
            Please enter your username.
          </div>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Please enter your password.
          </div>
          <p
            onClick={() => {
              navigate("/login/forgot-password");
            }}
          >
            Forgot your password?
          </p>
          <button
            type="submit"
            value="submit"
            className="btn-login"
            onClick={handleLogin}
          >
            Login
          </button>
          <p className="register-link" onClick={handleRegisterClick}>
            Don't have an account? Click here
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
