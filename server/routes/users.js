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

// Sign up Users
router.post("/account/register", (req, res) => {
    // Form Validation

    const { errors, isValid } = validateRegisterInput(req.body);

    // Check For Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
    .then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists"});
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
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
                });
            });
        }
    });
});