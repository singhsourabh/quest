import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addResponse, reset_new_flag } from "./../../actions/posts";
import { resetError } from "./../../actions/errors";

class NewResponse extends Component {
  state = { response: "" };

  onClick = (e) => {
    e.preventDefault();
    this.props.addResponse(this.props.postId, this.state.response);
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  componentDidUpdate(prevProps) {
    if (prevProps.newAdded != this.props.newAdded) {
      this.props.reset_new_flag();
      this.props.resetError();
      this.setState({ response: "" });
    }
  }

  componentWillUnmount() {
    this.props.resetError();
  }

  render() {
    return (
      <div className="comment-box">
        {this.props.isAuthenticated ? (
          <Fragment>
            <div className="row m-0">
              <div className="input-field col s12 m-0">
                {this.props.newAdded ? (
                  <Fragment>
                    <textarea
                      id="comment-area"
                      className="materialize-textarea m-0"
                      onChange={this.onChange}
                      name="response"
                      value=""
                    ></textarea>
                    <span className="helper-text">
                      Refrain from posting offensive response
                    </span>
                  </Fragment>
                ) : (
                  <Fragment>
                    {this.props.error && this.props.error.response ? (
                      (console.log(this.props.error),
                      (
                        <Fragment>
                          <textarea
                            id="comment-area"
                            className="materialize-textarea m-0 validate invalid"
                            onChange={this.onChange}
                            name="response"
                          ></textarea>
                          <span
                            className="helper-text"
                            data-error={this.props.error.response}
                          ></span>
                        </Fragment>
                      ))
                    ) : (
                      <Fragment>
                        <textarea
                          id="comment-area"
                          className="materialize-textarea m-0 validate"
                          onChange={this.onChange}
                          name="response"
                        ></textarea>
                        <span className="helper-text">
                          Refrain from posting offensive response
                        </span>
                      </Fragment>
                    )}
                  </Fragment>
                )}
                <label htmlFor="comment-area">Add a response</label>
              </div>
            </div>
            <div className="row m-0">
              <div className="right input-field" id="post-btn">
                <button
                  className="waves-effect waves-light btn m-0"
                  onClick={this.onClick}
                >
                  Post
                </button>
              </div>
            </div>
          </Fragment>
        ) : (
          <p className="blue-grey-text m-0" id="comment-alert">
            Log in or sign up to leave a response
          </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  newAdded: state.posts.newAdded,
  error: state.errors,
});

export default connect(mapStateToProps, {
  addResponse,
  reset_new_flag,
  resetError,
})(NewResponse);
