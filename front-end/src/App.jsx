import React from "react";
import "./App.css";
import Header from "./components/Header";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Footer from "./components/Footer";
import Immobilier from "./Pages/Immobiler";
import AdminLogin from "./components/admin/LoginPage";
import axios from "axios";
import Dash from "./components/admin/Dash";

function App() {
  const navigate = useNavigate();

  function AuthAdmin(objet) {
    if (!objet) {
      console.error("No authentication data provided");
      return;
    }

    axios.post(
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

      // test du code HTTP correct
      if (response.status === 201) {
        localStorage.setItem("admin_token", response.data.token);
        localStorage.setItem(
          "admin_name",
          response.data.user.nom + " " + response.data.user.prenom
        );
        navigate("/backoffise/admin/adminPage/dashboard");
      } else {
        console.warn("Authentication failed with status:", response.status);
      }
    })
    .catch((error) => {
      console.error(
        "There was an error during authentication:",
        error.response?.data || error.message
      );
    });
  }

  return (
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
              <Route path="/backoffise/admin/adminPage/dashboard" element={<Dash />} />
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
    </Routes>
  );
}

export default App;
