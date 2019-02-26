import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      votes: 0
    };

    this.onClick = this.onClick.bind(this);
    this.downClick = this.downClick.bind(this);
  }

  onClick() {
    this.setState({
      votes: this.state.votes + 1
    });
  }

  downClick() {
    this.setState({
      votes: this.state.votes - 1
    });
  }

  render() {
    return (
      <div className="Comment col-3 bg-light border rounded border-dark m-3 p-3">
        <span className="font-weight-bold">{this.props.comment.firstName}</span>
        &nbsp;&nbsp;
        <span className="font-weight-bold">{this.props.comment.lastName}</span>
        <br />
        <span>Position: {this.props.comment.pos}</span>
        &nbsp;&nbsp;
        <span>Team: {this.props.comment.teamId}</span>
        <br />
        <button className="btn btn-info" onClick={this.onClick}>
          <span role="img" aria-label="upvote for this player">
            👍
          </span>
        </button>
        &nbsp;&nbsp;
        <button className="btn btn-info" onClick={this.downClick}>
          <span role="img" aria-label="Downvote for this player">
            👎
          </span>
        </button>
        &nbsp;&nbsp;
        <span>{this.props.comment.votes}</span>
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired
};
