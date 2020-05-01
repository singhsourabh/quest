import React, { Component } from "react";
import "./styles/App.css";

import Navbar from "./components/common/Navbar";
import Dashboard from "./components/DashBoard";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AddPost from "./components/post/AddPost";
import ErrorToast from "./components/common/ErrorToast";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <ErrorToast />
          <BrowserRouter>
            <Navbar />
            <Route path="/" exact component={Dashboard} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <PrivateRoute path="/addpost" exact component={AddPost} />
          </BrowserRouter>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
