import React, { Component } from "react";
class Navbar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="teal lighten-2">
          <div className="nav-wrapper container">
            <a href="#!" className="brand-logo">
              QUEST
            </a>
            <a
              href="#"
              data-target="mobile-side"
              className="sidenav-trigger right valign-wrapper"
            >
              <span className="material-icons">more_vert</span>
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Login</a>
              </li>
              <li>
                <a href="#">Register</a>
              </li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-side">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Login</a>
          </li>
          <li>
            <a href="#">Register</a>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}
export default Navbar;
