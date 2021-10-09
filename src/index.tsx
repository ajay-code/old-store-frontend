import React from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";

// console.log(process.env.TEST_VAR);

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById("root")
);
