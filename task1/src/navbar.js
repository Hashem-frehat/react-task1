import React from "react";
import { Link } from "react-router-dom";

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
  return (
    <nav style={navbarStyle}>
      <div style={logoStyle}>MyApp</div>
      <div style={linksStyle}>
        <Link to="/contactus">contactus</Link>
        <Link to="/about">Aboutus</Link>
        <Link to="/signup">signup</Link>
      </div>
    </nav>
  );
}

export default Navbar;
