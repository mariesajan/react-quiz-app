import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, browserHistory } from "react-router";
import Layout from "./components/layout";

const app= document.getElementById('app');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path= "/" component={Layout} />
  </Router>
  ,app
);
