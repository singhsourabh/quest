import React, { Component, Fragment } from "react";
import Loader from "./../common/Loader";
import ResponseCard from "./ResponseCard";
import { connect } from "react-redux";
import { getPostDetail, resetPostDetails } from "./../../actions/posts";
import ShowMoreText from "./../common/ShowMoreText";

class PostResponse extends Component {
  state = {
    id: "",
    isPostLoading: true,
    isResponseLoading: true,
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({ id: id });
    this.props.getPostDetail(this.props.isAuthenticated, id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isAuthenticated != this.props.isAuthenticated) {
      this.props.getPostDetail(this.props.isAuthenticated, this.state.id);
    }
    if (prevProps.post != this.props.post && this.props.post != null) {
      this.setState({ isPostLoading: false });
    }
    if (
      prevProps.responses != this.props.responses &&
      this.props.responses != null
    ) {
      this.setState({ isResponseLoading: false });
    }
  }

  componentWillUnmount() {
    this.props.resetPostDetails();
  }

  render() {
    const {
      id = "",
      title = "",
      details = "",
      created_by = "",
      created_at = "",
      upvote_count = "",
      downvote_count = "",
      response_count = "",
      seen_count = "",
      is_upvoted = "",
      is_downvoted = "",
    } = this.props.post || {};

    const upClass = is_upvoted == true ? "up-active" : "up";
    const downClass = is_downvoted == true ? "down-active" : "down";

    return (
      <Fragment>
        <div className="container">
          <div className="card horizontal">
            <div className="card-stacked">
              {this.state.isLoading ? <Loader /> : null}

              <div className="card-content">
                <h5 className={`header post-title blue-grey-text darken-4`}>
                  {title}
                </h5>
                <p className={`blue-grey-text darken-3 post-detail`}>
                  <ShowMoreText text={details} />
                </p>
                <p className={`post-by grey-text darken-4`}>
                  Posted by <a>{created_by}</a> {created_at}
                </p>
              </div>
              <div className="card-action">
                <div className="action-pannel">
                  <div className="action-btn valign-wrapper">
                    <i className={`material-icons action-icon ${upClass}`}>
                      thumb_up
                    </i>
                    <span>{upvote_count}</span>
                  </div>
                  <div className="action-btn valign-wrapper">
                    <i
                      className={`material-icons action-icon down ${downClass}`}
                    >
                      thumb_down
                    </i>
                    <span>{downvote_count}</span>
                  </div>
                  <div className="action-btn valign-wrapper">
                    <i className="material-icons action-icon">remove_red_eye</i>
                    <span>{seen_count}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>Responses: {response_count}</div>
          <hr style={{ border: 0, borderTop: "1px solid #b0bec5" }} />
          {!this.state.isResponseLoading &&
            this.props.responses.map((response) => (
              <ResponseCard key={response.id} data={response} />
            ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  post: state.posts.postDetails.post,
  responses: state.posts.postDetails.responses,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getPostDetail, resetPostDetails })(
  PostResponse
);
