import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // This should import the Tailwind CSS file
import App from "./App";
import "./App.css"; // Ensure this line is present
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
