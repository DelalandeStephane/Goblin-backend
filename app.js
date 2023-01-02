const express = require("express");
var bodyParser = require('body-parser')
const app = express();
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

// Connecting to the database
mongoose
  .connect(dbConfig.mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to the database");
  })
  .catch((err) => {
    console.log("The server cannot connect to the database "+err);
    process.exit();
  });
  
  app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//app.use(express.json());

const authRoutes = require("./routes/auth");
const monsterRoutes = require("./routes/monster");

app.use("/api/auth", authRoutes);
app.use("/api/monster", monsterRoutes);

module.exports = app;