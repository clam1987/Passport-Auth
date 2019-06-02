// import React from 'react';
import React, { Component } from "react";
import './App.css';
import NavBar from "./components/layouts/NavBar/NavBar";
import Landing from "./components/layouts/Landing/Landing";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">

        <NavBar />
        <Landing />
      </div>
      </Router>
    );
  }
}

export default App;
