import React, { Component } from "react";

class Register extends Component {
  render() {
    return (
      <div className="container">
        <div className="row auth-box">
          <form className="col s12 m8 l6 offset-m2 offset-l3">
            <div className="card-panel auth-card">
              <div className="center-align teal-text">
                <h3 className="auth-heading">Register</h3>
              </div>
              <div className="input-field">
                <input
                  className="validate"
                  type="text"
                  id="username-register"
                ></input>
                <label htmlFor="username-register">Enter username</label>
              </div>
              <div className="input-field">
                <input
                  className="validate"
                  type="email"
                  id="email-register"
                ></input>
                <label htmlFor="email-register">Enter email</label>
              </div>
              <div className="input-field">
                <input
                  className="validate"
                  type="password"
                  id="password-register"
                ></input>
                <label htmlFor="password-register">Enter password</label>
              </div>
              <div className="input-field">
                <input
                  className="validate"
                  type="password"
                  id="confirm-pass-register"
                ></input>
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
export default Register;
