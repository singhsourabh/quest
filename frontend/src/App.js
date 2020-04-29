import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/DashBoard";
import "./styles/App.css";
import "./components/Login";
import "./components/Register";
import Login from "./components/Login";
import Register from "./components/Register";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Route } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <BrowserRouter>
            <Navbar />
            <Route path="/" exact component={Dashboard} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </BrowserRouter>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
