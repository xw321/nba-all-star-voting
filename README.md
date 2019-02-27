# nba-all-star-voting


Project 2 for Web Development course(CS5610) in Northeastern University, Silicon Valley (Spring 2019 semester). You can find the couse web page [here](http://johnguerra.co/classes/webDevelopment_spring_2019/ "CS-5610 Web Development Spring 2019").


# Description
A very simple MERN(Mongo, Express, React, Node) App that mimics NBA All star voting.

User can use this app to upvote/downte a player, and search for a player by name, or sort players by votes, name, postion.

All vote update and querry results would dispkay in real-time

The backend is in the routes folder, and the frontend that lays on the [front](./front) folder

# Requires

Node
Express
npm
yarn
Mongo (it defaults to a local Mongo server running on 27017 without auth)

# Usage

Clone the repo, then open the terminal on the folder created and run

```
yarn install
yarn start
```

This will run the backend on the port 3001, then open another terminal and run

```
cd front
yarn install
yarn start
```

Which will run the front-end development server on the port 3000, then visit (http://localhost:3000) and you should see the app running

# Database

This project uses a databese that modified from [here](http://data.nba.net//data/10s/prod/v1/2018/players.json), which is an open API for retreving NBA related data. You can learn the details [here](https://github.com/kshvmdn/nba.js/blob/master/docs/api/DATA.md).



This project is under standard MIT license.
