import React, { Component } from "react";

import "./App.css";

import Comment from "./Comment.js";

import MainTemplate from "./MainTemplate.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.myInputText = null;

    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    this.reloadData();
  }

  reloadData() {
    fetch("/api/getMessages")
      .then(res => res.json())
      .then(data => {
        console.log("got data!", data);
        this.setState({
          comments: data
        });
      });
  }

  renderComments() {
    return this.state.comments.map((c, i) => <Comment key={i++} comment={c} />);
  }

  onCreateComment(event) {
    event.preventDefault();

    if (!this.myInputText) {
      console.log("inText not set not inserting");
      return;
    }

    // Post
    console.log("Send the post");
    fetch("/api/createMessage", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: this.myInputText.value })
    })
      .then(response => response.json())
      .then(result => {
        console.log("Inserted the data!!", result);

        //clearing the input
        this.myInputText.value = "";
        // Redraw
        console.log("Reload data");
        this.reloadData();
      });
  }

  render() {
    console.log("Rendering");

    return (
      <MainTemplate>
        <div className="App">
          <h1>Vote!</h1>
          <div className="row">{this.renderComments()}</div>
        </div>
      </MainTemplate>
    );
  }
}

// <h2>Create a new comment</h2>
// <form onSubmit={this.onCreateComment.bind(this)}>
//   <div>
//     <label htmlFor="inAuthor">
//       {" "}
//       Author
//       <input id="inAuthor" type="text" name="author" />
//       {/* Remember to add the ref */}
//     </label>
//   </div>
//   <div>
//     <label htmlFor="inComment">
//       {" "}
//       Comment:
//       <input
//         id="inComment"
//         type="text"
//         name="text"
//         ref={input => (this.myInputText = input)}
//       />
//     </label>
//   </div>

//   <input type="submit" value="Submit" />
// </form>

export default App;
