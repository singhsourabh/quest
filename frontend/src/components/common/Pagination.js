import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export default class Pagination extends Component {
  render() {
    const { previous, next, current, count, source } = this.props.data;
    return (
      <ul className="pagination">
        {previous ? (
          <li className="waves-effect">
            <Link to={{ pathname: source, search: `?page=${previous}` }}>
              <i className="material-icons">chevron_left</i>
            </Link>
          </li>
        ) : (
          <li className="disabled">
            <a>
              <i className="material-icons">chevron_left</i>
            </a>
          </li>
        )}
        {[...Array(count)].map((x, i) =>
          current == i + 1 ? (
            <li className="active" key={i + 1}>
              <Link
                to={{ pathname: source, search: `?page=${i + 1}` }}
                className="teal lighten-1"
              >
                {i + 1}
              </Link>
            </li>
          ) : (
            <li className="waves-effect" key={i + 1}>
              <Link to={{ pathname: source, search: `?page=${i + 1}` }}>
                {i + 1}
              </Link>
            </li>
          )
        )}
        {next ? (
          <li className="waves-effect">
            <Link to={{ pathname: source, search: `?page=${next}` }}>
              <i className="material-icons">chevron_right</i>
            </Link>
          </li>
        ) : (
          <li className="disabled">
            <a>
              <i className="material-icons">chevron_right</i>
            </a>
          </li>
        )}
      </ul>
    );
  }
}
