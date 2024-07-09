import React from "react";

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
        <a href="#home" style={linkStyle}>
          Home
        </a>
        <a href="#about" style={linkStyle}>
          About
        </a>
        <a href="#contact" style={linkStyle}>
          Contact
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
