import React, { Component } from "react";
import PropTypes from "prop-types";
import MenuBar from "./MenuBar.js";

export default class MainTemplate extends Component {
  render() {
    return (
      <div >
        <MenuBar />

        
        

        {this.props.children}

        <div className="back">
          {" "}
          
        </div>
      </div>
    );
  }
}

MainTemplate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
