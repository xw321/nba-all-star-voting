function reloadData() {
  // Create a request variable and assign a new XMLHttpRequest object to it.
  var request = new XMLHttpRequest();

  // Open a new connection, using the GET request on the URL endpoint
  request.open("GET", "data", true);

  request.onload = function () {
    // Begin accessing JSON data here

    if (request.status >= 200 && request.status < 400) {

      const docs = JSON.parse(this.response);
      //console.log("docs : " + docs);
      populatePlayers(docs);
      console.log("got data! " + docs.length);

    } else {
      console.log("error");
    }
  };

  console.log("requesting data");
  // Send request
  request.send();
}


function createPlayerDiv(playerObj) {
  const playerDiv = document.createElement("div");
  playerDiv.className = "col-4 border";
  playerDiv.id = playerObj.personID;

  var playerName = document.createElement("h3");
  var voteDisplay = document.createElement("p");

  // I try to use such id in the POST request, so that the backend/database can know which player to look for. 
  voteDisplay.id = "votes/" + playerDiv.id;

  playerName.textContent = playerObj.firstName + " " + playerObj.lastName + "\r\n";
  voteDisplay.textContent = "Votes: " + playerObj.votes.toString() + "\r\n";

  // new line space
  var brr = document.createElement("br");

  // Each player has a name field, next line is his votes, then the vote button. We can show more info later. Trivial work.
  playerDiv.appendChild(playerName);
  playerDiv.appendChild(brr);
  playerDiv.appendChild(voteDisplay);
  playerDiv.appendChild(brr);

  // add vote button in div
  var upButton = document.createElement("BUTTON");
  var upBtnText = document.createTextNode("Upvote");
  upButton.appendChild(upBtnText);
  playerDiv.appendChild(upButton);

  var downButton = document.createElement("BUTTON");
  var downBtnText = document.createTextNode("Downvote");
  downButton.appendChild(downBtnText);
  playerDiv.appendChild(downButton);

  // ------------------ Need to add button click response feature --------------------------
  // By folllowing what John did, we add a function to handle button click event. Inside that function, 
  // we have a new XMLHTTPrequest, and send a POST request to index.js
  // in index.js, we need to add a rout that handle such request

  // -------- Below commentted code was wrong, dont try to fix it ---------------

  // upButton.onclick = function () { upVote(playerDiv.id); };

  // upButton.addEventListener("click", function () {
  //   console.log("button was clicked");
  //   fetch("/clicked", { 
  //     method: "POST",
  //     body: this.id})
  //     .then(function (response) {
  //       if (response.ok) {
  //         console.log("click was recorded");
  //         return;
  //       }
  //       throw new Error("Request failed.");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // });



  return playerDiv;
}

function populatePlayers(Players) {

  const PlayersDiv = document.getElementById("players");


  Players.forEach(function (playerObj) {
    console.log("FOUND ONE DOC ELEM : " + playerObj);
    const playerDiv = createPlayerDiv(playerObj);
    PlayersDiv.appendChild(playerDiv);
  });

}




reloadData();

