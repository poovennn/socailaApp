import App from "./App";
import reactDom from "react-dom";
import React from "react";
import { Authcontextprovider } from "./context/Authcontext";

reactDom.render(
  <React.StrictMode>
    <Authcontextprovider>
      <App />
    </Authcontextprovider>
  </React.StrictMode>,
  document.getElementById("root")
);
