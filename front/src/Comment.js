import React, { Component } from "react";
import PropTypes from "prop-types";

let teamFile = require("./team.json");
let teamMap = new Map();

let i = 0;
while (i < 30) {
  teamMap.set(teamFile[i].teamId.toString(), teamFile[i].teamName);
  i++;
  //console.log("create map" + i);
}

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
    fetch("/api/getPlayerById/" + this.props.comment.personId)
      .then(res => res.json())
      .then(data => {
        this.setState({
          votes: data[0].votes
        });
      });
  }

  // upvote button trigger a post request to DB with this player's ID
  // after getting response, reload
  onClick() {
    // Post
    fetch("/api/upvote", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ personId: this.props.comment.personId })
    })
      .then(response => response.json())
      .then(result => {
        console.log("UPVOTE player return result!!" + result);
        this.reloadData();
      });
  }

  // downvote button trigger a post request to DB with this player's ID
  // after getting response, reload
  downClick() {
    // Post
    fetch("/api/downvote", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ personId: this.props.comment.personId })
    })
      .then(response => response.json())
      .then(result => {
        console.log("UPVOTE player return result!!" + result);
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
    let myTeamId = this.props.comment.teamId;
    return teamMap.get(myTeamId);
  }

  render() {
    return (
      <div className="Comment col-3 bg-light border border-secondary border-rounded">
        <div>
          <img
            className="float-left mt-3 mr-3 ml-3"
            src={
              "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/" +
              this.props.comment.personId +
              ".png"
            }
            alt="plaer thumbnail"
            height="57"
            width="78"
          />
          <span className="font-weight-bold">
            {this.props.comment.firstName}
          </span>
          &nbsp;
          <span className="font-weight-bold">
            {this.props.comment.lastName}
          </span>
          <br />
          <span>Age: {this.state.age}</span>
          <br />
          <span>Position: {this.props.comment.pos}</span>
          &nbsp;&nbsp;
          <br />
          <span>Team: {this.state.teamName}</span>
        </div>
        <button className="btn btn-info ml-3" onClick={this.onClick}>
          <span role="img" aria-label="upvote for this player">
            ✔
          </span>
        </button>
        &nbsp;&nbsp;
        <button className="btn btn-info" onClick={this.downClick}>
          <span role="img" aria-label="Downvote for this player">
            ✖
          </span>
        </button>
        &nbsp;&nbsp;
        <span>
          # of votes:{" "}
          <span className="font-weight-bold text-info">{this.state.votes}</span>
        </span>
        <br />
        <a
          className="text-info d-flex justify-content-center"
          href={
            "https://en.wikipedia.org/wiki/" +
            this.props.comment.firstName +
            "_" +
            this.props.comment.lastName
          }
        >
          {" "}
          Learn More
        </a>
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired
};
