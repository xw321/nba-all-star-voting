var express = require("express");
var router = express.Router();

function connect(callback) {
  var MongoClient = require("mongodb").MongoClient;

  var url = "mongodb://localhost:27017";

  var client = new MongoClient(url);

  client.connect(function(err) {
    if (err !== null) throw err;

    var db = client.db("nba_all_star");
    var comments = db.collection("players");

    console.log("Connected!");
    callback(comments, client);
  });
}

function getComments(callback) {
  connect(function(comments, client) {
    comments
      .find({})
      .limit(100)
      .toArray(function(err, docs) {
        if (err !== null) throw err;
        console.log("got " + docs.length + " comments");
        callback(docs);
        client.close();
      });
  });
}

// querry database to get given player data.
// send back in a JSON array (only one data)
function getOne(c, callback) {
  connect(function(comments, client) {
    comments
      .find({ personId: c })
      .limit(1)
      .toArray(function(err, docs) {
        if (err !== null) throw err;
        //console.log("got " + docs.length + " comments");
        callback(docs);
        client.close();
      });
  });
}

function getTopTen(callback) {
  connect(function(comments, client) {
    comments
      .find()
      .sort({ votes: -1 })
      .limit(10)
      .toArray(function(err, docs) {
        if (err !== null) throw err;
        console.log("got " + docs.length + " comments");
        callback(docs);
        client.close();
      });
  });
}

// querry database to increnment given player votes
function upVote(c, callback) {
  console.log("player ID   " + c);
  connect(function(comments, client) {
    comments.updateOne({ personId: c }, { $inc: { votes: 1 } });
    comments.find({ personId: c }).toArray(function(err, docs) {
      if (err !== null) throw err;
      //console.log("upvoted >>>>>>> " + docs);
      callback(docs);
      client.close();
    });
  });
}

// querry database to decrement given player votes
function downVote(c, callback) {
  console.log("player ID   " + c);
  connect(function(comments, client) {
    comments.updateOne({ personId: c }, { $inc: { votes: -1 } });
    comments.find({ personId: c }).toArray(function(err, docs) {
      if (err !== null) throw err;
      //console.log("upvoted >>>>>>> " + docs);
      callback(docs);
      client.close();
    });
  });
}

router.post("/upvote", function(req, res, next) {
  console.log(req.body);
  upVote(req.body.personId, function(result) {
    console.log("upvoted from call back" + result);
    res.send(result);
  });
});

router.post("/downvote", function(req, res, next) {
  console.log(req.body);
  downVote(req.body.personId, function(result) {
    console.log("downvote from call back" + result);
    res.send(result);
  });
});

router.get("/getMessages", function(req, res, next) {
  console.log("getMessages!!!!");
  getComments(function(docs) {
    res.send(docs);
  });
});

router.get("/getPlayer/:personId", function(req, res, next) {
  console.log("get one id" + req.params.personId);
  getOne(req.params.personId, function(docs) {
    res.send(docs);
  });
});

router.get("/topten", function(req, res, next) {
  console.log("top ten!!!!");
  getTopTen(function(docs) {
    res.send(docs);
  });
});

module.exports = router;
