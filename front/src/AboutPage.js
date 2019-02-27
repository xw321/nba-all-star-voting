import React, { Component } from "react";

import MainTemplate from "./MainTemplate.js";
import "./App.css";

import Comment from "./Comment.js";

export default class AboutPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    this.reloadData();
  }

  reloadData() {
    fetch("/api/topten")
      .then(res => res.json())
      .then(data => {
        console.log("got data Ten!", data);
        this.setState({
          comments: data
        });
      });
  }

  renderComments() {
    return this.state.comments.map((c, i) => <Comment key={i++} comment={c} />);
  }

  render() {
    console.log("Rendering");

    return (
      <MainTemplate>
        <div className="App">
          <h1 className="d-flex justify-content-around">Top Ten!</h1>
          <div className="row d-flex justify-content-around">
            {this.renderComments()}
          </div>
        </div>
      </MainTemplate>
    );
  }
}
