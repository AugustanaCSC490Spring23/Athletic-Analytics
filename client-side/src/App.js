import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import About from "./pages/Aboutus";
import Faq from "./pages/Faq";
import Features from "./pages/Features";
import Login from "./pages/Login";
import Indranking from "./pages/Indranking";
import Squadranking from "./pages/Squadrankings";
import Schoolprofiles from "./pages/Schoolprofiles";

import {Routes, Route} from "react-router-dom";


function App() {
  return (
    <>
      <Navbar />
      <div className= "container">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/features" element={<Features />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/faq" element={<Faq />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/Indranking" element={<Indranking />}/>
          <Route path="/Squadranking" element={<Squadranking />}/>
          <Route path="/Schoolprofiles" element={<Schoolprofiles />}/>

        </Routes>
      </div>
    </>
  )
}

export default App
