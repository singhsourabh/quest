import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "./../../actions/auth";
import { resetError } from "./../../actions/errors";
import M from "materialize-css";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password1: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password1 } = this.state;
    this.props.registerUser(username, email, password, password1);
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  componentDidUpdate(prevProps) {
    const error = this.props.error;
    if (prevProps.error.non_field_errors != error.non_field_errors) {
      if (error.non_field_errors && error.scope == "local") {
        M.toast({ html: error.non_field_errors });
      }
    }
  }

  componentWillUnmount() {
    this.props.resetError();
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const err = this.props.error;
    return (
      <div className="container">
        <div className="row auth-box">
          <form
            className="col s12 m8 l6 offset-m2 offset-l3"
            onSubmit={this.onSubmit}
          >
            <div className="card-panel auth-card">
              <div className="center-align teal-text">
                <h3 className="auth-heading">Register</h3>
              </div>
              <div className="input-field">
                <input
                  className={`validate${err.username ? " invalid" : ""}`}
                  type="text"
                  id="username-register"
                  name="username"
                  onChange={this.onChange}
                ></input>
                <span className="helper-text" data-error={err.username}>
                  Try something unique.
                </span>

                <label htmlFor="username-register">Enter username</label>
              </div>
              <div className="input-field">
                <input
                  className={`validate${err.email ? " invalid" : ""}`}
                  type="email"
                  id="email-register"
                  name="email"
                  onChange={this.onChange}
                ></input>
                <span className="helper-text" data-error={err.email}>
                  Use your active email.
                </span>

                <label htmlFor="email-register">Enter email</label>
              </div>
              <div className="input-field">
                <input
                  className={`validate${err.password ? " invalid" : ""}`}
                  type="password"
                  id="password-register"
                  name="password"
                  onChange={this.onChange}
                ></input>
                <span className="helper-text" data-error={err.password}>
                  Use a strong password.
                </span>
                <label htmlFor="password-register">Enter password</label>
              </div>
              <div className="input-field">
                <input
                  className={`validate${err.password1 ? " invalid" : ""}`}
                  type="password"
                  id="confirm-pass-register"
                  name="password1"
                  onChange={this.onChange}
                ></input>
                <span className="helper-text" data-error={err.password1}></span>

                <label htmlFor="confirm-pass-register">Confirm password</label>
              </div>
              <button type="submit" className="col s12 btn waves-effect">
                Register
              </button>
              <br />
              <br />
              <span className="signup">
                Already registered? <a>Login</a>
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

export default connect(mapStateToProps, { registerUser, resetError })(Register);
