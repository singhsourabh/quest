import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./../../actions/auth";

class Navbar extends Component {
  onClick = () => {
    this.props.logout();
  };
  render() {
    const { user, isAuthenticated } = this.props;
    const authLinks = (
      <ul className="right hide-on-med-and-down auth-links">
        <li>
          <a className="disabled-link">
            <i className="material-icons left">account_circle</i>
            {user}
          </a>
        </li>
        <li>
          <Link to="#" onClick={this.onClick}>
            Logout
          </Link>
        </li>
      </ul>
    );
    const guestLinks = (
      <ul className="right hide-on-med-and-down auth-links">
        <li>
          <Link to="/login" className="white-text">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    );
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
              {isAuthenticated ? authLinks : guestLinks}
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

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
