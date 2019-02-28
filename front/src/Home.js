import React, { Component } from "react";

import MainTemplate from "./MainTemplate.js";
import "./main.css";

let action = [
  "Play",
  "Explore",
  "Strive",
  "Code",
  "Run",
  "Fight",
  "Compete",
  "Believe",
  "Give",
  "Dream"
];
let n = action.length;

export default class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.timer = this.timer.bind(this);
    this.getText = this.getText.bind(this);
    this.state = {
      intervalId: 0,
      currentCount: 0,
      verb: "Play"
    };
  }

  componentDidMount() {
    var intervalId = setInterval(this.timer, 1000);
    // store intervalId in the state so it can be accessed later:
    this.setState({ intervalId: intervalId });
    console.log("mount");
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.intervalId);
    this.setState({ currentCount: 0 });
  }

  timer() {
    // setState method is used to update the state
    //console.log("timer");
    if (this.state.currentCount === n - 1) {
      this.setState({ currentCount: 0 });
      let text0 = this.getText();
      this.setState({ verb: text0 });
    } else {
      this.setState({ currentCount: this.state.currentCount + 1 });
      let text0 = this.getText();
      this.setState({ verb: text0 });
    }
  }

  getText() {
    let index = this.state.currentCount;
    return action[index];
  }

  render() {
    return (
      <MainTemplate>
        <div className="title">
          <h1 className="text-center hometitle">
            Picking the 2019 NBA All-Star Teams
          </h1>

          <div className="frontText d-flex justify-content-center">
            Who should start, who should get a reserve spot, come and vote your
            favorite players
          </div>

          <div>
            <h2 className="text-center subtitle">
              This is Why We &nbsp;
              <span className="text-center subtitle2 bg-dark">
                &nbsp;{this.state.verb}&nbsp;
              </span>
            </h2>{" "}
          </div>

          <p>
            <img
              className="m-3 p-0"
              src={require("./imgs/1.jpg")}
              height="100%"
              width="100%"
              alt="frontpage"
            />
          </p>
        </div>

        <footer className="frontText2 d-flex justify-content-center">
          By&nbsp;<a href="https://xw321.github.io/"> Xun</a> &nbsp;and&nbsp;
          <a href="https://yzhao430.github.io/">Yan</a>
        </footer>
      </MainTemplate>
    );
  }
}
