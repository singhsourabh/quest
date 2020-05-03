import React, { Component } from "react";
import M from "materialize-css";
import { connect } from "react-redux";

class ErrorToast extends Component {
  componentDidUpdate(prevProps) {
    const error = this.props.errors;
    if (prevProps.errors.error != error.error && error.scope == "global") {
      M.toast({ html: error.error });
    }
  }

  render() {
    return <React.Fragment />;
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps)(ErrorToast);
