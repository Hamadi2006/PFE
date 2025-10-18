import React from "react";
import "./App.css";
import Header from "./components/Header";
import {  Route, Routes} from 'react-router-dom';
import HomePage from "./Pages/HomePage";
import Footer from "./components/Footer";
import Immobilier from "./Pages/Immobiler";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/immobilier" element={<Immobilier/>} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
