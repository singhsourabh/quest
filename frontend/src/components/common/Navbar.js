import React, { Component } from "react";
import { Route, Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "./../../actions/auth";
import { getPosts } from "./../../actions/posts";

class Navbar extends Component {
  state = {
    search: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.getPosts(this.props.isAuthenticated, {
      search: this.state.search,
    });
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

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
          <div className="nav-wrapper row">
            <Link to="/" className="brand-logo">
              <b>QUEST</b>
            </Link>
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
            <form
              className="hide-on-med-and-down col l5 offset-l2"
              onSubmit={this.onSubmit}
            >
              <div className="input-field teal lighten-3">
                <input
                  className="white-text"
                  id="search"
                  type="search"
                  name="search"
                  onChange={this.onChange}
                />
                <label className="label-icon" htmlFor="search">
                  <i className="material-icons">search</i>
                </label>
                <i className="material-icons">close</i>
              </div>
            </form>
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

export default connect(mapStateToProps, { logout, getPosts })(Navbar);
