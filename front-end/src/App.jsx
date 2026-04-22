import React, { useContext } from "react";
import "./App.css";
import Header from "./components/client/Header";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./components/Pages/HomePage";
import Footer from "./components/client/Footer";
import Immobilier from "./components/Pages/Immobiler";
import AdminLogin from "./components/admin/LoginPage";
import Dash from "./components/admin/Dash";
import { GlobaleContext } from "./context/GlobaleContext";
import SuccessAlert from "./components/client/AlertSucc";
import { UserContext } from "./context/contextValues";
import RequireAuth from "./midleware/Auth";
import FailAlert from "./components/client/FailAlert";
import InfoPage from "./components/Pages/InfoPage";
import ServicePage from "./components/Pages/ServicePage";
import PartnerLogin from "./components/companies/PartnerLogin";
import PartnerDashboard from "./components/companies/Dashboard";
import CompanieAuth from "./midleware/CompanieAuth";
import SocietiesPage from "./components/Pages/SocietiesPage";
import SocieteInfoPage from "./components/Pages/SocieteInfoPage";
import AccountPage from "./components/Pages/AccountPage";
import ClientSignIn from "./components/client/auth/ClientSignIn";
import ClientSignUp from "./components/client/auth/ClientSignUp";
import ClientAuth from "./midleware/ClientAuth";
import {
  getErrorMessage,
  saveAdminSession,
} from "./utils/authStorage";
import { loginAdmin } from "./services/authService";

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
  const { setUser, setToken } = useContext(UserContext);

  async function AuthAdmin(objet) {
    if (!objet) {
      console.error("No authentication data provided");
      return false;
    }

    try {
      const response = await loginAdmin(objet);

      const authenticatedUser = response.data?.user;
      const authToken = response.data?.token;

      if (!authenticatedUser || !authToken) {
        throw new Error("Reponse d'authentification incomplete.");
      }

      if (authenticatedUser.actif === false || authenticatedUser.actif === 0) {
        throw new Error("Ce compte administrateur est desactive.");
      }

      saveAdminSession({ token: authToken, user: authenticatedUser });
      setUser(authenticatedUser);
      setToken(authToken);
      setAlertFail(false);
      setAlertSucc(true);
      setAlertMsg("Authentification reussie !");
      navigate("/ad-dashboard", { replace: true });
      return true;
    } catch (error) {
      console.error(
        "Erreur durant l'authentification:",
        error.response?.data || error.message
      );
      setAlertSucc(false);
      setAlertFail(true);
      setAlertMsg(getErrorMessage(error, "Email ou mot de passe invalide."));
      return false;
    }
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
          onClose={() => setAlertFail(false)}
        />
      )}
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/immobilier" element={<Immobilier />} />
                <Route path="/immobilier/:id/information" element={<InfoPage />} />
                <Route path="/services" element={<ServicePage />} />
                <Route path="/society" element={<SocietiesPage />} />
                <Route path="/company/:nom" element={<SocieteInfoPage />} />
                <Route path="/sign-in" element={<ClientSignIn />} />
                <Route path="/sign-up" element={<ClientSignUp />} />
                <Route
                  path="/account"
                  element={
                    <ClientAuth>
                      <AccountPage />
                    </ClientAuth>
                  }
                />
                <Route path="*" element={<div>404 Not Found</div>} />
              </Routes>
              <Footer />
            </>
          }
        />

        <Route path="/ad-login" element={<AdminLogin AuthAdmin={AuthAdmin} />} />

        <Route
          path="/ad-dashboard"
          element={
            <RequireAuth>
              <Dash />
            </RequireAuth>
          }
        />

        <Route path="/partner-login" element={<PartnerLogin />} />
        <Route
          path="/partner-dashboard"
          element={
            <CompanieAuth>
              <PartnerDashboard />
            </CompanieAuth>
          }
        />

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
