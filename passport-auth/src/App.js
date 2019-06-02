// import React from 'react';
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './App.css';

import { Provider } from "react-redux";
import store from "./store";

import NavBar from "./components/layouts/NavBar/NavBar";
import Landing from "./components/layouts/Landing/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
      <div className="App">
        <NavBar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
