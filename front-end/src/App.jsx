import React, { useContext } from "react";
import "./App.css";
import Header from "./components/Header";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Footer from "./components/Footer";
import Immobilier from "./Pages/Immobiler";
import AdminLogin from "./components/admin/LoginPage";
import axios from "axios";
import Dash from "./components/admin/Dash";
import { GlobaleContext } from "./context/GlobaleContext";
import SuccessAlert from "./components/AlertSucc";
import { UserContext } from "./context/UserContext";
import RequireAuth from "./midleware/Auth";
import FailAlert from "./components/FailAlert";

function App() {
  const navigate = useNavigate();
  const {
    alertSucc,
    setAlertSucc,
    alertFail,
    setAlertFail,
    alertMsg,
    setAlertMsg,
  } = useContext(GlobaleContext);
  const { user, setUser, token, setToken } = useContext(UserContext);

  // Fonction d’authentification admin
  function AuthAdmin(objet) {
    if (!objet) {
      console.error("No authentication data provided");
      return;
    }

    axios
      .post(
        "http://127.0.0.1:8000/api/admin/login",
        {
          email: objet.email,
          mot_de_passe: objet.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Response from server:", response.data);

        if (response.status === 201) {
          setUser(response.data.user);
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setAlertSucc(true);
          setAlertMsg("Authentification réussie !");
          navigate("/backoffise/admin/adminPage/dashboard");
        } else {
          console.warn("Authentication failed with status:", response.status);
          setAlertFail(true);
          setAlertMsg("Échec d'authentification.");
        }
      })
      .catch((error) => {
        console.error(
          "Erreur durant l'authentification:",
          error.response?.data || error.message
        );
        setAlertFail(true);
        setAlertMsg("Erreur serveur ou identifiants invalides.");
      });
  }

  console.log("Current user in App component:", user);
  console.log("Current token in App component:", token);

  return (
    <>
      {alertSucc && (
        <SuccessAlert
          message={alertMsg}
          duration={3000}
          onClose={() => setAlertSucc(false)}
        />
      )}
      {alertFail && (
        <FailAlert
          message={alertMsg}
          duration={3000}
          onClose={() => setAlertSucc(false)}
        />
      )}
      <Routes>
        {/* Frontoffice */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/immobilier" element={<Immobilier />} />
              </Routes>
              <Footer />
            </>
          }
        />

        {/* Backoffice */}
        <Route
          path="/backoffise/admin/adminPage/authentification"
          element={<AdminLogin AuthAdmin={AuthAdmin} />}
        />

        <Route
          path="/backoffise/admin/adminPage/dashboard"
          element={
            <RequireAuth>
              <Dash />
            </RequireAuth>
          }
        />

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
