import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./../../actions/auth";

class Navbar extends Component {
  onClickLogout = () => {
    this.props.logout();
  };
  render() {
    const { user, isAuthenticated } = this.props;

    const authLinks = (
      <React.Fragment>
        <li>
          <Link to="/addpost">
            <i className="material-icons left">add_circle</i>
            Add Post
          </Link>
        </li>
        <li>
          <a className="disabled-link">
            <i className="material-icons left">account_circle</i>
            {user}
          </a>
        </li>
        <li>
          <Link to="#" onClick={this.onClickLogout}>
            Logout
          </Link>
        </li>
      </React.Fragment>
    );
    const guestLinks = (
      <React.Fragment>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </React.Fragment>
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
              <ul className="right hide-on-med-and-down auth-links">
                {isAuthenticated ? authLinks : guestLinks}
              </ul>
            </div>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-side">
          {isAuthenticated ? authLinks : guestLinks}
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
