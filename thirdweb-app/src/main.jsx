import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import App from "./App"; // Ensure the casing matches the actual file name
import "./index.css"; // Import your global CSS file
import { StateContextProvider } from "./contract-functions"; // Import your context provider

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <ThirdwebProvider activeChain="sepolia" clientId="61d941252b3c2ee1b017e5ce82faab7a"> {/* Added clientId */}
        <StateContextProvider>
          <App />
        </StateContextProvider>
      </ThirdwebProvider>
    </Router>
  </React.StrictMode>
);