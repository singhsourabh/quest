import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="teal lighten-2">
          <div className="nav-wrapper">
            <div className="container">
              <a href="#" className="brand-logo">
                <b>QUEST</b>
              </a>
              <a
                href="#"
                data-target="mobile-side"
                className="sidenav-trigger right valign-wrapper"
              >
                <span className="material-icons">more_vert</span>
              </a>
              <ul className="right hide-on-med-and-down auth-links">
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-side">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}
export default Navbar;
