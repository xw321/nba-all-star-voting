import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import App from "./App.js";
import Home from "./Home.js";
import AboutPage from "./AboutPage.js";
import MainTemplate from "./MainTemplate.js";

const NoMatch = ({ location }) => (
  <div>
    <MainTemplate>
      <h3>
        Page not found :( <code>{location.pathname}</code>
      </h3>
    </MainTemplate>
  </div>
);

export default class MyRouter extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/vote" component={App} />
            <Route path="/topten" component={AboutPage} />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}
