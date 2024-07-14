import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Header/Navbar";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Footer from "./components/Footer/Footer";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import RRouter from "./Routes/Route";
import { UserProvider } from "./context/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OrderProvider } from "./context/useOrder";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <UserProvider>
          <OrderProvider>
            <div className="content">
              <main className="main-content">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/login/forgot-password"
                    element={<ForgotPassword />}
                  />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route
                    path="*"
                    element={
                      <>
                        <Navbar />
                        <RRouter />
                        <Footer />
                      </>
                    }
                  />
                </Routes>
              </main>
            </div>
          </OrderProvider>
        </UserProvider>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
