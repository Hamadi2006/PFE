import React from "react";
import "./App.css";
import Header from "./components/Header";
import {  Route, Routes} from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import Footer from "./components/Footer";
import Immobilier from "./Pages/Immobiler";
import AdminLogin from "./components/admin/LoginPage";
function App() {

  function AuthAdmin(objet){
    if(!objet ) return;
    console.log("AuthAdmin information is",objet);
  }
  
return (
    <Routes>
      {/* frontoffice*/}
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

      {/* backoffice*/}
        <Route
        path="/backoffise/admin/adminPage/authentification"
        element={<AdminLogin AuthAdmin={AuthAdmin}/>}
      />
    </Routes>
  );
}

export default App;
