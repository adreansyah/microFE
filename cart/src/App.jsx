import React from "react";
import ReactDOM from "react-dom";
import Cart from "./cart";
import "./index.scss";
const App = (props) => (
  <Cart />
);
ReactDOM.render(<App />, document.getElementById("app"));
