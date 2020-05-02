import React, { Component, Fragment } from "react";
import _ from "lodash";

export default class ShowMoreText extends Component {
  state = {
    shortText: "",
    fullText: "",
    short: true,
  };

  toggle = () => {
    this.setState({ short: !this.state.short });
  };

  toggler = () => {
    const { fullText } = this.state;
    if (fullText.length > 150) {
      return (
        <Fragment>
          <a onClick={this.toggle} style={{ cursor: "pointer" }}>
            [{this.state.short ? "show more" : "show less"}]
          </a>
        </Fragment>
      );
    }
    return null;
  };

  componentDidMount() {
    this.setState({
      shortText: _.truncate(this.props.text, { omission: "", length: 150 }),
      fullText: this.props.text,
      short: true,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text != this.props.text) {
      this.setState({
        shortText: _.truncate(this.props.text, { omission: "", length: 150 }),
        fullText: this.props.text,
        short: true,
      });
    }
  }

  render() {
    return (
      <Fragment>
        {this.state.short ? this.state.shortText : this.state.fullText}{" "}
        {this.toggler()}
      </Fragment>
    );
  }
}
