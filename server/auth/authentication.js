const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/register", (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;


    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hash,
      firstName,
      lastName,
    });

    newUser
      .save()
      .then((result) => {
        console.log(result);
        res.json({ message: "User created successfully" });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
