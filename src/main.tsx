import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Find the HTML element where the React app will be mounted
const rootElement = document.getElementById("root");

// Safety check: Ensure the element exists before trying to render
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Create the React root using the new React 18+ API
const root = ReactDOM.createRoot(rootElement);

// Render the application wrapped in StrictMode for development checks
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
