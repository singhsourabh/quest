import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "./../actions/posts";

class DashBoard extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    return (
      <div className="container">
        <h1>welcome</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
});

export default connect(mapStateToProps, { getPosts })(DashBoard);
