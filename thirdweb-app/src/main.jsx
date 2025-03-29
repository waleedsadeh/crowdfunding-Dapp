import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import App from "./App"; // Ensure the casing matches the actual file name
import "./index.css"; // Import your global CSS file

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <ThirdwebProvider>
        <App />
      </ThirdwebProvider>
    </Router>
  </React.StrictMode>
);