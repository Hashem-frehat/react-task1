import React from "react";
import initState from "./json";
const heroStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "4rem 2rem",
  backgroundColor: "#f5f5f5",
  color: "#333",
  margin: "5px",
};

const buttonStyle = {
  padding: "0.75rem 2rem",
  fontSize: "1rem",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "2rem",
};

// function Main() {
//   initState.books.map((ele) => {
//     return (
//       <section style={heroStyle}>
//         <h1>{ele.title}</h1>
//         <p>Your one-stop solution for everything!</p>
//         <button style={buttonStyle}>Get Started</button>
//       </section>
//     );
//   });
// }
function Main() {
  return (
    <div>
      {initState.books.map((ele, index) => (
        <section key={index} style={heroStyle}>
          <h1>{ele.title}</h1>
          <p>{ele.author}</p>
          <p>{ele.isbn}</p>
        </section>
      ))}
    </div>
  );
}

export default Main;
