import { createContext, useEffect, useState } from "react";
import { User } from "../models/User";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";
import "../App.css";

type UserContextType = {
  user: User | null;
  token: string | null;
  registerUser: (user: User) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  role: string;
  id: string;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [role, setRole] = useState<string>("");
  const [id, setId] = useState<string>("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      setRole(storedRole!);
      setId(JSON.parse(user).id);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (user: User) => {
    console.log(user);
    await register(
      user.email,
      user.password,
      user.name,
      user.surname,
      user.username,
      user.address,
      user.city,
      user.birtdate,
      user.phone,
      user.pol,
      user.profilePicture
    )
      .then(async (res) => {
        if (res) {
          toast.success("Register Success, confirm your registration!");
          navigate("/login");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const loginUser = async (username: string, password: string) => {
    try {
      await login(username, password)
        .then(async (res) => {
          if (res) {
            localStorage.setItem("token", res?.data.token);
            axios.defaults.headers.common["Authorization"] =
              "Bearer " + res.data.token;
            const role = res?.data.roles;
            setRole(role);
            let userObj;
            setId(res?.data.id);
            switch (role) {
              case "Admin":
                userObj = await getUserData("Admin", res?.data.id);
                break;
              case "Konobar":
                userObj = await getUserData("Konobar", res?.data.id);
                break;
              case "Kuvar":
                userObj = await getUserData("Kuvar", res?.data.id);
                break;
              case "Manager":
                userObj = await getUserData("Manager", res?.data.id);
                break;
              case "Sanker":
                userObj = await getUserData("Sanker", res?.data.id);
                break;
              case "Musterija":
                userObj = await getUserData("Musterija", res?.data.id);
                break;
              default:
                userObj = null;
                break;
            }
            const userObj2 = {
              userName: userObj.userName,
              email: userObj.email,
              name: userObj.ime,
              surname: userObj.prezime,
              birtdate: userObj.datumRodjenja,
              address: userObj.adresa,
              city: userObj.grad,
              phone: userObj.phoneNumber,
              pol: userObj.pol,
              id: res?.data.id,
              profilePicture: userObj.profilePicture,
            };
            localStorage.setItem("user", JSON.stringify(userObj2));
            localStorage.setItem("role", JSON.stringify(role));
            setToken(res?.data.token!);
            setUser(userObj);
            setRole(role);
            setId(res?.data.id);
            toast.success("Login Success!");
            navigate("/profil");
          }
        })
        .catch((e) => toast.error("Server error occured"));
    } catch (e) {
      toast.error("ERROR" + e);
    }
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    toast.success(`You're logged out`);
    setUser(null);
    setToken("");
    setRole("");
    setId("");
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        registerUser,
        loginUser,
        user,
        token,
        logout,
        isLoggedIn,
        role,
        id,
      }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);

const getUserData = async (role: string, id: any) => {
  const mapUrl: { [key: string]: string } = {
    Admin: `http://localhost:5104/Musterija/GetMusterijaById/${id}`,
    Konobar: `http://localhost:5104/Konobar/GetKonobarById/${id}`,
    Kuvar: `http://localhost:5104/Kuvar/GetKuvarById/${id}`,
    Sanker: `http://localhost:5104/Sanker/GetSankerById/${id}`,
    Musterija: `http://localhost:5104/Musterija/GetMusterijaById/${id}`,
    Manager: `http://localhost:5104/Menadzer/GetMenadzerById/${id}`,
  };

  try {
    const res = await axios.get(mapUrl[role]);
    return res.data;
  } catch (e) {
    toast.error("ERROR: Failed to get user data");
    return null;
  }
};
