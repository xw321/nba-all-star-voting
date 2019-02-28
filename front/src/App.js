import React, { Component } from "react";

import "./App.css";

import Comment from "./Comment.js";

import MainTemplate from "./MainTemplate.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.myInputText = null;
    this.state = {
      players: [],
      message: ""
    };
  }

  componentDidMount() {
    this.reloadData();
    console.log("After loading players length : " + this.state.players.length);
  }

  reloadData() {
    fetch("/api/getMessages")
      .then(res => res.json())
      .then(data => {
        console.log("initial load page");
        this.setState({
          players: data
        });
      });
  }

  renderPlayers() {
    return this.state.players.map((c, i) => <Comment key={i++} comment={c} />);
  }

  validateName(event) {
    event.preventDefault();
    let name = this.myInputText.value.toString().toLocaleLowerCase();
    name = name.trim();
    let pattern = /^[a-zA-Z\s]+$/;
    if (!name.match(pattern)) {
      alert("Invald name");
    } else {
      name = name.replace(/\s+/g, " ");
      console.log(name);
      let nameArr = name.split(" ");
      if (nameArr.length === 1) {
        // only one name filed, querry DB using that as both firstname and lastname
        this.searchByName(nameArr[0], " ");
      } else {
        // querry db using the first and last in arr
        this.searchByName(nameArr[0], nameArr[nameArr.length - 1]);
      }
    }
  }

  searchByName(firstName, lastName) {
    fetch("/api/getPlayerByName/" + firstName + " " + lastName)
      .then(res => res.json())
      .then(data => {
        console.log("got one! data from search   " + data.length);
        this.myInputText.value = "";
        this.setState({
          players: []
        });
        this.setState({
          players: data
        });
        if (data === undefined || data.length === 0) {
          this.setState({
            message: "No player match your criteria"
          });
        } else {
          this.setState({
            message: ""
          });
        }
        console.log(
          "After QUERRY players length : " + this.state.players.length
        );
      });
  }

  handleChange(event) {
    console.log("select queery is :   " + event.target.value);
    let sortBy = event.target.value;
    //this.setState({ value: event.target.value });
    //alert("Your favorite flavor is: " + this.state.value);
    this.searchByName(sortBy, " ");
  }

  render() {
    console.log("Rendering");

    return (
      <MainTemplate>
        <div className="App">
          <h1 className="d-flex justify-content-around">Vote!</h1>
          <br />
          <br />
          <div className="row d-flex justify-content-around">
            <form
              className="form-inline form-group border rounded"
              onSubmit={this.validateName.bind(this)}
            >
              <div>
                <label htmlFor="inAuthor">
                  {" "}
                  <input
                    id="inName"
                    type="text"
                    name="name"
                    placeholder="Search name here"
                    ref={input => (this.myInputText = input)}
                  />
                </label>
              </div>
              <input
                className="btn btn-secondary bg-secondary text-light border rounded"
                type="submit"
                value="Search"
              />
            </form>

            <div className="col-4 input-group mb-3">
              <div className="input-group-prepend form-check form-check-inline">
                <label className="input-group-text form-check form-check-inline">
                  Sort by:{" "}
                </label>
              </div>
              <select
                className="custom-select form-check form-check-inline"
                onChange={this.handleChange.bind(this)}
              >
                <option value="name">Name</option>
                <option value="mostvotes">Most Votes</option>
                <option value="leastvotes">Least Votes</option>
                <option value="pos">Position</option>
                <option value="age">Age</option>
              </select>
            </div>
          </div>

          <br />
          <br />
          <div className="row d-flex justify-content-around">
            {this.renderPlayers()}
          </div>
          <br />
          <div>
            <h3 className="d-flex justify-content-around text-danger">
              {this.state.message}
            </h3>
          </div>
        </div>
      </MainTemplate>
    );
  }
}

export default App;
