import React from "react";
import ReactDOM from "react-dom";

import Header from "microfrontend-1/header";

import Content from "microfrontend-2/content";
import "./index.css"
import { Provider } from "react-redux";
import store from "./store";
import Footer from "microfrontend-3/footer";
const App = () => (
  <div>
    <Header props={"hello"} />
    <Content />
    <Footer />
  </div>
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app"));
