import React from "react";
import { json, Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const navbarStyle = {
  paddingLeft: "95px",
  paddingRight: "95px",
  backgroundColor: "#7ed958",
  borderBottom: "2px solid gray",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const logoStyle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "white",
};

const linksStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "500px",
  alignItems: "center",
};

const linkStyle = {
  textDecoration: "none",
  color: "white",
  fontWeight: "bold",
  marginLeft: "15px",
};
function Navbar() {
  const navigate = useNavigate();
  const b = localStorage.getItem("signup-form") !== null;
  function Handlelogout() {
    localStorage.removeItem("signup-form");
    navigate("/");
  }
  return (
    <nav style={navbarStyle}>
      <div style={logoStyle}>MyApp</div>
      <div style={linksStyle}>
        <Link to="/contactus">contactus</Link>
        <Link to="/about">Aboutus</Link>
        {b ? (
          <button onClick={Handlelogout}>Logout</button>
        ) : (
          <Link to="/signup">signup</Link>
        )}

        <Link to="/home">home</Link>
      </div>
    </nav>
  );
}

export default Navbar;
