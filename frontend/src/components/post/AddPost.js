import React, { Component } from "react";
import { connect } from "react-redux";
import { addPost, reset_new_flag } from "./../../actions/posts";
import { raiseError, resetError } from "./../../actions/errors";
import { Redirect } from "react-router-dom";

class AddPost extends Component {
  state = {
    title: "",
    details: "",
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addPost(this.state.title, this.state.details);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.newAdded != this.props.newAdded && this.props.newAdded) {
      setTimeout(() => {
        M.toast({ html: "Post added" }, 1000);
      });
    }
  }
  componentWillUnmount() {
    this.props.reset_new_flag();
    this.props.resetError();
  }
  render() {
    if (this.props.newAdded) {
      return <Redirect to="/" />;
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
                <h3 className="auth-heading">Add Post</h3>
              </div>
              {this.props.error && this.props.error.title ? (
                <div className="input-field">
                  <input
                    className="validate invalid"
                    type="text"
                    id="title-addpost"
                    name="title"
                    onChange={this.onChange}
                  ></input>
                  <span
                    className="helper-text"
                    data-error={this.props.error.title}
                  ></span>
                  <label htmlFor="title-addpost">Enter post title</label>
                </div>
              ) : (
                <div className="input-field">
                  <input
                    className="validate"
                    type="text"
                    id="title-addpost"
                    name="title"
                    onChange={this.onChange}
                  ></input>
                  <span className="helper-text"></span>
                  <label htmlFor="title-addpost">Enter post title</label>
                </div>
              )}
              {this.props.error && this.props.error.details ? (
                <div className="input-field">
                  <textarea
                    className="materialize-textarea validate invalid"
                    id="details-addpost"
                    name="details"
                    onChange={this.onChange}
                  ></textarea>
                  <span
                    className="helper-text"
                    data-error={this.props.error.details}
                  ></span>
                  <label htmlFor="details-addpost">Describe your post</label>
                </div>
              ) : (
                <div className="input-field">
                  <textarea
                    className="materialize-textarea validate"
                    id="details-addpost"
                    name="details"
                    onChange={this.onChange}
                  ></textarea>
                  <span className="helper-text"></span>
                  <label htmlFor="details-addpost">Describe your post</label>
                </div>
              )}
              <button type="submit" className="col s12 btn waves-effect">
                Add
              </button>
              <br />
              <br />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  newAdded: state.posts.newAdded,
  error: state.errors,
});
export default connect(mapStateToProps, {
  addPost,
  reset_new_flag,
  raiseError,
  resetError,
})(AddPost);
