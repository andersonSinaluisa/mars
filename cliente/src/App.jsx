import React from "react";
import "./App.css";
import Landing from "./components/Landing";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/signup" component={Signup} exact />
        {/* <Route path="/" component={Landing} exact /> */}
      </Switch>
    </Router>
  );
};

export default App;
