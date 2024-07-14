import axios from "axios";
import { toast } from "react-toastify";

function handleError(error: any) {
  if (axios.isAxiosError(error)) {
    var err = error.response;
    if (Array.isArray(err?.data.errors)) {
      for (let val of err?.data.errors) {
        toast.warning(val.desscription);
      }
    } else if (typeof err?.data.errors === "object") {
      for (let e in err?.data.errors) {
        toast.warning(err?.data.errors[e][0]);
      }
    } else if (err?.status === 401) {
      toast.warning("Username or password is incorrect!");
      window.history.pushState({}, "LoginPage", "/login");
    } else if (err?.data) {
      toast.warning(err?.data);
    } else if (err) {
      toast.warning(err?.data);
    }
  } else {
    toast.error("Server error occurred");
  }
}

const API_URL = "http://localhost:5104/api/Auth/";

const register = async (
  email: string,
  password: string,
  name: string,
  surname: string,
  username: string,
  address?: string,
  city?: string,
  birtdate?: string,
  phone?: string,
  pol?: string,
  profilePicture?: string
) => {
  try {
    const data = await axios.post(API_URL + "register", {
      ime: name,
      prezime: surname,
      pol: pol,
      datumRodjenja: birtdate,
      adresa: address,
      grad: city,
      telefon: phone,
      email: email,
      username: username,
      password: password,
      profilePicture: profilePicture,
    });
    return data;
  } catch (e: any) {
    handleError(e);
  }
};

const login = async (username: string, password: string) => {
  try {
    const data = await axios.post(API_URL + "login", {
      username: username,
      password: password,
    });
    return data;
  } catch (e) {
    handleError(e);
  }
};

export { register, login };
