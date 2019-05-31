const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const path = require("path");

// Body Parser Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup dbconfig
const db = require("./config/connection").mongoURI;

// Connecting to MonGod
mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log("You've connected to the MonGod"))
.catch(err => console.log(err));

// Connection to the localhost
app.listen(PORT, function() {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});
