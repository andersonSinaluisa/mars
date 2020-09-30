import React from "react";
import "./App.css";
import Nav from "./components/Nav";
import Landing from "./components/Landing";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";

const App = () => {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/" component={Landing} exact />
      </Switch>
    </Router>
  );
};

export default App;
