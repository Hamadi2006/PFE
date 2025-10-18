import React from "react";
import "./App.css";
import Header from "./components/Header";
import {  Route, Routes} from 'react-router-dom';
import HomePage from "./Pages/HomePage";
function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<HomePage/>} />
        {/* Add more routes as needed */}
      </Routes>
    </>
  );
}

export default App;
