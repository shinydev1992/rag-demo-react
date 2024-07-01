import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./@core/scss/core.scss";

const widget = document.createElement("div");
widget.setAttribute("id", "poolmanager-livechat");
widget.style.position = "fixed";
widget.style.zIndex = 1000;
document.body.appendChild(widget);
const root = ReactDOM.createRoot(
  document.getElementById("poolmanager-livechat")
);
root.render(<App />);
