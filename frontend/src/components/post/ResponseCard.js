import React, { Component, Fragment } from "react";
import ShowMoreText from "./../common/ShowMoreText";

class ResponseCard extends Component {
  render() {
    const {
      response,
      created_at,
      created_by,
      upvote_count,
      downvote_count,
      is_upvoted,
      is_downvoted,
    } = this.props.data;
    const upClass = is_upvoted == true ? "up-active" : "up";
    const downClass = is_downvoted == true ? "down-active" : "down";

    return (
      <Fragment>
        <div className="card horizontal">
          <div className="card-stacked">
            <div className="card-content">
              <p className={`blue-grey-text darken-3 post-detail`}>
                <ShowMoreText text={response} />
              </p>
              <p className={`post-by grey-text darken-4`}>
                Responded by <a>{created_by}</a> {created_at}
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
                  <i className={`material-icons action-icon down ${downClass}`}>
                    thumb_down
                  </i>
                  <span>{downvote_count}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ResponseCard;
