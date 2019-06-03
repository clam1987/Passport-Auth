const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../config/connection");

// Require input validation
const validateRegisterInput = require("../controllers/register");
const validateLoginInput = require("../controllers/login");

// Load User Model
const User = require("../models/User");

//Routers
router.use(express.urlencoded({ extended: true }))

// Sign up Users
router.post("/account/register", (req, res) => {
  // Form Validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check For Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password to encrypt before posting to database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// Login Users
router.post("/account/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation for email and password
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    //Check if passsword is correct
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Signin Token
        jwt.sign(
          payload,
          connection.SECRET,
          {
            expiresIn: 31511223 // random time > 11 months
          },
          (err, token) => {
            res.json({
              sucess: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordisincorrect: "Password is incorrect" });
      }
    });
  });
});

module.exports = router;
