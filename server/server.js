const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const path = require("path");

//dotenv config
require("dotenv").config();

// Body Parser Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Requiring routes
const users = require("./routes/users");

// Setup dbconfig
const db = require("./config/connection").mongoURI;

// Connecting to MonGod
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("You've connected to the MonGod"))
  .catch(err => console.log(err));

// Passport MiddleWare
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Routes
app.use("/users", users);

// React Route
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '"../passport-auth/public/index.html"'));
})

// Connection to the localhost
app.listen(PORT, function() {
  console.log(
    "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
    PORT,
    PORT
  );
});
