import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <form className="col s12 m8 l6 offset-m2 offset-l3">
            <div className="card-panel">
              <div className="center-align teal-text">
                <h3 className="login-heading">
                  <b>Login</b>
                </h3>
              </div>
              <div className="input-field">
                <input
                  className="validate"
                  type="text"
                  id="username-login"
                ></input>
                <label htmlFor="username-login">Enter username or email</label>
              </div>
              <div className="input-field">
                <input
                  className="validate"
                  type="password"
                  id="password-login"
                ></input>
                <label htmlFor="password-login">Enter password</label>
              </div>
              <button type="submit" className="col s12 btn waves-effect">
                Login
              </button>
              <br />
              <br />
              <span className="signup">
                Don't have an account? <a>Register</a>
              </span>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
