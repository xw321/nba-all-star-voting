const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
// Connection URL
const url = "mongodb://localhost:27017";
const app = express();
const port = 3000;
app.use(express.static("public"));

// ------------------ Above lines are essential code that initiate server, database, etc --------------------------
let db;


// handling the GET 'data' request from main.js
app.get("/data", function (req, res) {
  console.log("Got a request");
  getPlayers(function (docs) {
    res.send(docs);
  });

});


app.listen(port, function () {
  console.log("Listening on " + port);
});

// I try to use this to handle the vote button POST(or GET maybe ?) request from main.js. 
// Still not sure what to do and how to show updated votes in real-time
app.post("/clicked", (req, res) => {
  var myquery = { firstName: "Steve", lastName: "Adams" };
  MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);

    // Below was a hard-coded DB update on player Steve Adams, which inremented his votes by 1
    var collection = db.collection("players");
    collection.findOneAndUpdate(myquery, { $update: { $inc: { votes: 1 } } }, { upsert: true }, function (err, doc) {
      assert.equal(null, err);
      console.log("Updated" + doc);
    });

  });
  console.log("click added to db" + res);
});



function getPlayers(callback) {
  // Database Name
  const dbName = "nba_all_star";
  // Create a new MongoClient
  const client = new MongoClient(url);

  // Use connect method to connect to the Server
  client.connect(function (err) {
    assert.equal(null, err);
    //console.log("Connected successfully to server");

    db = client.db(dbName);
    const players = db.collection("players");

    players.find({}).limit(10).toArray(function (err, docs) {
      //console.log("Query result");
      assert.equal(null, err);

      //console.log("Got docs " + docs.length);

      callback(docs);
      console.log("Closing");
      client.close();
    });
  });


}
