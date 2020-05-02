import React, { Component, Fragment } from "react";

export default class Loader extends Component {
  render() {
    return (
      <Fragment>
        <div className="progress" style={{ margin: 0 }}>
          <div className="indeterminate"></div>
        </div>
      </Fragment>
    );
  }
}
