import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "./../../actions/auth";
import { raiseError } from "./../../actions/errors";
import { connect } from "react-redux";
import queryString from "querystring";
import _ from "lodash";

class Login extends Component {
  state = {
    login_id: "",
    password: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state.login_id, this.state.password);
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const next = _.get(
      queryString.decode(this.props.location.search),
      "?next",
      "/"
    );
    if (this.props.isAuthenticated) {
      return <Redirect to={next} />;
    }
    return (
      <div className="container">
        <div className="row auth-box">
          <form
            className="col s12 m8 l6 offset-m2 offset-l3"
            onSubmit={this.onSubmit}
          >
            <div className="card-panel auth-card">
              <div className="center-align teal-text">
                <h3 className="auth-heading">Login</h3>
              </div>

              {this.props.error && this.props.error.login_id ? (
                <div className="input-field">
                  <input
                    className="validate invalid"
                    name="login_id"
                    type="text"
                    id="username-login"
                    onChange={this.onChange}
                  ></input>
                  <span
                    className="helper-text"
                    data-error={this.props.error.login_id}
                  ></span>
                  <label htmlFor="username-login">Username or email</label>
                </div>
              ) : (
                <div className="input-field">
                  <input
                    className="validate"
                    name="login_id"
                    type="text"
                    id="username-login"
                    onChange={this.onChange}
                  ></input>
                  <span className="helper-text"></span>
                  <label htmlFor="username-login">Username or email</label>
                </div>
              )}
              {this.props.error && this.props.error.password ? (
                <div className="input-field">
                  <input
                    className="validate invalid"
                    name="password"
                    type="password"
                    id="password-login"
                    onChange={this.onChange}
                  ></input>
                  <span
                    className="helper-text"
                    data-error={this.props.error.password}
                  ></span>
                  <label htmlFor="password-login">Password</label>
                </div>
              ) : (
                <div className="input-field">
                  <input
                    className="validate"
                    name="password"
                    type="password"
                    id="password-login"
                    onChange={this.onChange}
                  ></input>
                  <label htmlFor="password-login">Password</label>
                </div>
              )}

              <button type="submit" className="col s12 btn waves-effect">
                Login
              </button>
              <br />
              <br />
              <span className="signup">
                Don't have an account? <Link to="/register">Register</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.errors,
});

export default connect(mapStateToProps, { login, raiseError })(Login);
