import "core-js";
import "raf/polyfill";
import "regenerator-runtime/runtime";
import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";
import Root from "./Root";
// import "./assets/styles/app.less";

ReactDOM.render(<Root />, document.getElementById("app"));

// registerServiceWorker();

// if (module.hot) {
//   module.hot.accept();
// }


