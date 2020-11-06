require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const XenoCanto = require("xeno-canto");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/birdDB", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

app.get("/", function(req, res) {
  const scBirds = new XenoCanto();

  const lat = "36.974117";
  const lon = "-122.030792";

  const query = {
  	coords: {
      lat: lat,
      lon: lon
    }
  };

  scBirds.search(query, function(self){
  	console.log(self.entity);
  });

  res.render("home");
});

app.listen(3000, function(req, res) {
  console.log("App is running on port 3000");
});
