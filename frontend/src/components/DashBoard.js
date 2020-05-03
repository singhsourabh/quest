import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "./../actions/posts";
import PostCard from "./post/PostCard";

class DashBoard extends Component {
  componentDidMount() {
    this.props.getPosts(this.props.isAuthenticated);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isAuthenticated != this.props.isAuthenticated) {
      this.props.getPosts(this.props.isAuthenticated);
    }
  }

  render() {
    return (
      <div className="container">
        <h5 className="header blue-grey-text ">
          <b>Posts:</b>
        </h5>
        {this.props.posts.map((post) => (
          <PostCard key={post.id} data={post} />
        ))}
        <ul class="pagination">
          <li class="disabled">
            <a href="#!">
              <i class="material-icons">chevron_left</i>
            </a>
          </li>
          <li class="active">
            <a href="#!" className="teal lighten-1">
              1
            </a>
          </li>
          <li class="waves-effect">
            <a href="#!">2</a>
          </li>
          <li class="waves-effect">
            <a href="#!">3</a>
          </li>
          <li class="waves-effect">
            <a href="#!">4</a>
          </li>
          <li class="waves-effect">
            <a href="#!">5</a>
          </li>
          <li class="waves-effect">
            <a href="#!">
              <i class="material-icons">chevron_right</i>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getPosts })(DashBoard);
