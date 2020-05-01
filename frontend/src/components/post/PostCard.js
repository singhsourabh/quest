import React, { Component } from "react";
import _ from "lodash";

class PostCard extends Component {
  render() {
    const {
      id,
      title,
      details,
      created_by,
      created_at,
      upvote_count,
      downvote_count,
      seen_count,
      is_upvoted,
      is_downvoted,
      is_seen,
    } = this.props.data;

    const upClass = is_upvoted == true ? "up-active" : "up";
    const downClass = is_downvoted == true ? "down-active" : "down";
    const seenClass = is_seen == true ? "seen" : "new";

    return (
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            <h5
              className={`header post-title blue-grey-text darken-4 ${seenClass}`}
            >
              {title}
            </h5>
            <p className={`blue-grey-text darken-3 post-detail ${seenClass}`}>
              {_.truncate(details, { omission: " [...]", length: 150 })}
            </p>
            <p className={`post-by grey-text darken-4 ${seenClass}`}>
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
                <i className={`material-icons action-icon ${downClass}`}>
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
    );
  }
}

export default PostCard;
