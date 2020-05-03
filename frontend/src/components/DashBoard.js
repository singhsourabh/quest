import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "./../actions/posts";
import PostCard from "./post/PostCard";
import Pagination from "./common/Pagination";
import qs from "qs";

class DashBoard extends Component {
  componentDidMount() {
    const query = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    this.props.getPosts(this.props.isAuthenticated, query);
  }

  componentDidUpdate(prevProps) {
    const query = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    });
    if (
      prevProps.isAuthenticated != this.props.isAuthenticated ||
      prevProps.pagination.current != (query.page || 1)
    ) {
      this.props.getPosts(this.props.isAuthenticated, query);
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
        <Pagination data={{ ...this.props.pagination, source: "/" }} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  pagination: state.posts.pagination,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getPosts })(DashBoard);
