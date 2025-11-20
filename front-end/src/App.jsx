import React, { useContext } from "react";
import "./App.css";
import Header from "./components/client/Header";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./components/Pages/HomePage"
import Footer from "./components/client/Footer";
import Immobilier from "./components/Pages/Immobiler"
import AdminLogin from "./components/admin/LoginPage";
import axios from "axios";
import Dash from "./components/admin/Dash";
import { GlobaleContext } from "./context/GlobaleContext";
import SuccessAlert from "./components/client/AlertSucc";
import { UserContext } from "./context/UserContext";
import RequireAuth from "./midleware/Auth";
import FailAlert from "./components/client/FailAlert";
import InfoPage from "./components/Pages/InfoPage";
import ServicePage from "./components/Pages/ServicePage";
import PartnerLogin from "./components/companies/PartnerLogin";
import PartnerDashboard from "./components/companies/Dashboard";
import CompanieAuth from "./midleware/CompanieAuth";
import SocietiesPage from "./components/Pages/SocietiesPage";
import SocieteInfoPage from "./components/Pages/SocieteInfoPage";

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
  const { user, setUser, token, setToken, admins } = useContext(UserContext);
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

        if (response.status === 201) {
          setUser(response.data.user);
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          setAlertSucc(true);
          setAlertMsg("Authentification réussie !");
          navigate("/ad-dashboard");
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
                <Route path="/immobilier/:id/information" element={<InfoPage />} />
                <Route path="*" element={<div>404 Not Found</div>} />
                <Route path="/services" element={<ServicePage />} />
                <Route path="/society" element={<SocietiesPage />} />
                <Route path="/company/:nom" element={<SocieteInfoPage />} />
              </Routes>
              <Footer />
            </>
          }
        />

        {/* Backoffice */}
        <Route
          path="/ad-login"
          element={<AdminLogin AuthAdmin={AuthAdmin} />}
        />

        <Route
          path="/ad-dashboard"
          element={
            <RequireAuth>
              <Dash />
            </RequireAuth>
          }
        />
      <Route
        path="/partner-login"
        element={<PartnerLogin   />}
      />
      <Route
        path="/partner-dashboard"
        element={<CompanieAuth><PartnerDashboard /></CompanieAuth>}
      />

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
