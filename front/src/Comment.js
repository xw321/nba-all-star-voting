import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Comment extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.downClick = this.downClick.bind(this);
    this.getAge = this.getAge.bind(this);
    this.state = {
      votes: this.props.comment.votes,
      age: this.getAge(),
      teamName: this.getTeam()
    };
  }

  componentDidMount() {
    this.reloadData();
  }

  // reload data when state change (i.e., player votes change)
  reloadData() {
    fetch("/api/getPlayer/" + this.props.comment.personId)
      .then(res => res.json())
      .then(data => {
        //console.log("got one! data   " + data);
        this.setState({
          votes: data[0].votes
        });
      });
  }

  // upvote button trigger a post request to DB with this player's ID
  // after getting response, reload
  onClick() {
    // Post
    console.log("Send the upvote post");
    fetch("/api/upvote", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ personId: this.props.comment.personId })
    })
      .then(response => response.json())
      .then(result => {
        console.log("UPVOTE player return result!!" + JSON.stringify(result));
        this.reloadData();
      });
  }

  // downvote button trigger a post request to DB with this player's ID
  // after getting response, reload
  downClick() {
    // Post
    console.log("Send the upvote post");
    fetch("/api/downvote", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ personId: this.props.comment.personId })
    })
      .then(response => response.json())
      .then(result => {
        console.log("UPVOTE player return result!!" + JSON.stringify(result));
        this.reloadData();
      });
  }

  getAge() {
    let birthday = new Date(this.props.comment.dateOfBirthUTC);
    let today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    let m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    let ageStr = age.toString();
    return ageStr;
  }

  getTeam() {
    let teamFile = require("./team.json");
    let myTeamId = this.props.comment.teamId;
    let i = 0;
    while (teamFile[i].teamId.toString() !== myTeamId) {
      i++;
    }
    if (i !== teamFile.length) {
      return teamFile[i].teamName;
    }
    return "no such team";
  }
  render() {
    return (
      <div className="Comment col-3 bg-light border rounded border-dark m-3 p-3">
        <span className="font-weight-bold">{this.props.comment.firstName}</span>
        &nbsp;
        <span className="font-weight-bold">{this.props.comment.lastName}</span>
        <br />
        <span>Position: {this.props.comment.pos}</span>
        &nbsp;&nbsp;
        <span>Age: {this.state.age}</span>
        <br />
        <span>Team: {this.state.teamName}</span>
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
        <span className="font-weight-bold text-primary">
          {this.state.votes}
        </span>
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired
};
