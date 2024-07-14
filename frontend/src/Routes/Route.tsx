import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import ONama from "../pages/ONama/ONama";
import Meni from "../pages/Meni/Meni";
import Zaposleni from "../pages/Zaposleni/Zaposleni";
import Recenzije from "../pages/Recenzije/Recenzije";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import Order from "../pages/Order/Order";
import ProtectedPanel from "./ProtectedPanel";
import Panel from "../pages/Panel/Panel";
import ConfirmEmail from "../pages/ConfirmEmail/ConfirmEmail";

const RRouter = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/onama" element={<ONama />} />
      <Route path="/meni" element={<Meni />} />
      <Route path="/zaposleni" element={<Zaposleni />} />
      <Route path="/recenzije" element={<Recenzije />} />
      <Route path="/ConfirmEmail" element={<ConfirmEmail />} />
      <Route
        path="/profil"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/narudzbina"
        element={
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        }
      />
      <Route
        path="/panel"
        element={
          <ProtectedPanel>
            <Panel />
          </ProtectedPanel>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RRouter;
