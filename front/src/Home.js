import React, { Component } from "react";

import MainTemplate from "./MainTemplate.js";
import "./main.css";

export default class AboutPage extends Component {
  render() {
    return (
      <MainTemplate>
        <div className="title">
          <h1 className="text-center">Picking the 2019 NBA All-Star Teams</h1>

          <div className="frontText d-flex justify-content-center">
            Who should start, who should get a reserve spot, come and vote your
            favorite players
          </div>
          <div className="frontText2 d-flex justify-content-center">
            By Xun and Yan
          </div>
          <p>
            <img
              src={require("./imgs/1.jpg")}
              height="100%"
              width="100%"
              alt="frontpage"
            />
          </p>
        </div>
      </MainTemplate>
    );
  }
}
