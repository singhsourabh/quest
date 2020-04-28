import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/DashBoard";
import "./App.css";
import "./components/Login";
import Login from "./components/Login";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Login />
        {/* <Dashboard /> */}
      </React.Fragment>
    );
  }
}

export default App;
