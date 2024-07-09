import React from "react";

const footerStyle = {
  backgroundColor: "#7ed958",
  padding: "1rem 2rem",
  textAlign: "center",
  color: "white",
  borderTop: "2px solid gray",
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  margin: "0 1rem",
};

function Footer() {
  return (
    <footer style={footerStyle}>
      <p>&copy; 2024 MyApp. All rights reserved.</p>
      <div>
        <a href="#privacy" style={linkStyle}>
          Privacy Policy
        </a>
        <a href="#terms" style={linkStyle}>
          Terms of Service
        </a>
        <a href="#contact" style={linkStyle}>
          Contact Us
        </a>
      </div>
    </footer>
  );
}

export default Footer;
