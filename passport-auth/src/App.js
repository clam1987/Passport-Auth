// import React from 'react';
import React, { Component } from "react";
import './App.css';
import NavBar from "./components/layouts/NavBar/NavBar";
import Landing from "./components/layouts/Landing/Landing";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Landing />
      </div>
    );
  }
}

export default App;
