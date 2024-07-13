import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Navbar from "./navbar";
import Main from "./main";
import Footer from "./footer";
import Aboutus from "./Aboutus";
import Contactus from "./contactus";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./signup";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="about" element={<Aboutus />} />
          <Route path="contactus" element={<Contactus />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/" element={<Main />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
