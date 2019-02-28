var express = require("express");
var router = express.Router();

// function connect(callback) {
//   var MongoClient = require("mongodb").MongoClient;

//   var url = "mongodb://localhost:27017";

//   var client = new MongoClient(url);

//   client.connect(function(err) {
//     if (err !== null) throw err;

//     var db = client.db("nba_all_star");
//     var comments = db.collection("players");

//     console.log("Connected!");
//     callback(comments, client);
//   });
// }

function connect(callback) {
  var MongoClient = require("mongodb").MongoClient;

  var dbURL = process.env.MONGODB_URI || require("./loginDetails.js");
  var client = new MongoClient(dbURL);
  client.connect(function(err) {
    if (err !== null) throw err;
    var db = client.db("nba_all_star");
    var players = db.collection("players");
    console.log("Connected!");
    callback(players, client);
  });
}

function getComments(callback) {
  connect(function(players, client) {
    players
      .find({})
      .limit(100)
      .toArray(function(err, docs) {
        if (err !== null) throw err;
        console.log("got " + docs.length + " players");
        callback(docs);
        client.close();
      });
  });
}

// querry database to get given player data.
// send back in a JSON array (only one data)
function getOne(c, callback) {
  connect(function(players, client) {
    players
      .find({ personId: c })
      .limit(1)
      .toArray(function(err, docs) {
        if (err !== null) throw err;
        //console.log("got " + docs.length + " players");
        callback(docs);
        client.close();
      });
  });
}

function getOneByName(c, callback) {
  connect(function(players, client) {
    players
      .find({
        $or: [{ firstName: c }, { lastName: c }]
      })
      .toArray(function(err, docs) {
        if (err !== null) throw err;
        //console.log("got " + docs.length + " players");
        callback(docs);
        client.close();
      });
  });
}

function getOneByFullName(first, last, callback) {
  connect(function(players, client) {
    players
      .find({
        firstName: first,
        lastName: last
      })
      .toArray(function(err, docs) {
        if (err !== null) throw err;
        //console.log("got " + docs.length + " players");
        callback(docs);
        client.close();
      });
  });
}

function getTopTen(num, querry, callback) {
  connect(function(players, client) {
    players
      .find()
      .sort(querry)
      .limit(num)
      .toArray(function(err, docs) {
        if (err !== null) throw err;
        console.log("got " + docs.length + " players");
        callback(docs);
        client.close();
      });
  });
}

// querry database to increnment given player votes
function upVote(c, callback) {
  console.log("player ID   " + c);
  connect(function(players, client) {
    players.updateOne({ personId: c }, { $inc: { votes: 1 } });
    players.find({ personId: c }).toArray(function(err, docs) {
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
  connect(function(players, client) {
    players.updateOne({ personId: c }, { $inc: { votes: -1 } });
    players.find({ personId: c }).toArray(function(err, docs) {
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

router.get("/getPlayerByName/:name", function(req, res, next) {
  let fullName = req.params.name.trim();

  if (fullName === "mostvotes") {
    let sortQuerry = { votes: -1 };
    getTopTen(100, sortQuerry, function(docs) {
      res.send(docs);
    });
  } else if (fullName === "leastvotes") {
    let sortQuerry = { votes: 1 };
    getTopTen(100, sortQuerry, function(docs) {
      res.send(docs);
    });
  } else if (fullName === "pos") {
    let sortQuerry = { pos: 1 };
    getTopTen(100, sortQuerry, function(docs) {
      res.send(docs);
    });
  } else if (fullName === "name") {
    getComments(function(docs) {
      res.send(docs);
    });
  } else if (fullName === "age") {
    let sortQuerry = { dateOfBirthUTC: 1 };
    getTopTen(100, sortQuerry, function(docs) {
      res.send(docs);
    });
  } else {
    let nameArr = fullName.split(" ");
    let name1 = nameArr[0];
    name1 = name1.charAt(0).toUpperCase() + name1.slice(1);
    //console.log("get one id" + req.params.firstName);
    if (nameArr.length === 1) {
      getOneByName(name1, function(docs) {
        res.send(docs);
      });
    } else {
      let name2 = nameArr[1];
      name2 = name2.charAt(0).toUpperCase() + name2.slice(1);
      getOneByFullName(name1, name2, function(docs) {
        res.send(docs);
      });
    }
  }
});

router.get("/topten", function(req, res, next) {
  console.log("top ten!!!!");
  getTopTen(10, { votes: -1 }, function(docs) {
    res.send(docs);
  });
});

module.exports = router;
