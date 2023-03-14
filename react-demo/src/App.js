import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import About from "./pages/Aboutus";
import Faq from "./pages/Faq";
import Features from "./pages/Features";
import Login from "./pages/Login";
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
        </Routes>
      </div>
    </>
  )
}

export default App
