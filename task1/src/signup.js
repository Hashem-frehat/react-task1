import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const signupContainerStyle = {
  maxWidth: "400px",
  margin: "50px auto",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
};

const formGroupStyle = {
  marginBottom: "15px",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  boxSizing: "border-box",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const buttonStyle = {
  width: "100%",
  padding: "10px 0",
  backgroundColor: "#7ed958",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
};

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    let newUser = {
      username: username,
      email: email,
      password: password,
    };

    let existingUsers = JSON.parse(localStorage.getItem("signup-form")) || [];

    if (!Array.isArray(existingUsers)) {
      existingUsers = [];
    }

    existingUsers.push(newUser);

    localStorage.setItem("signup-form", JSON.stringify(existingUsers));

    setUsername("");
    setEmail("");
    setPassword("");
    navigate("/");
  };

  return (
    <div style={signupContainerStyle}>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="username">
            Username:
          </label>
          <input
            style={inputStyle}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="email">
            Email:
          </label>
          <input
            style={inputStyle}
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="password">
            Password:
          </label>
          <input
            style={inputStyle}
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button style={buttonStyle} type="submit">
          signin
        </button>
      </form>
    </div>
  );
};

export default Signup;
