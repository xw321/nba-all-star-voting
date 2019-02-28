import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./main.css";
export default class MenuBar extends Component {
  render() {
    return (
      <div className="back col-12">
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <NavLink className="navbar-brand text-light" to="/">
            Home
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink
                  className="nav-link text-light"
                  activeClassName="active"
                  exact={true}
                  to="/vote"
                >
                  Vote Now
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link text-light"
                  activeClassName="active"
                  to="/topten"
                >
                  Top Players
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
