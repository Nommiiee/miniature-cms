const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    if (!username || !email || !password || !firstName || !lastName) {
      return res.status(500).json({ message: "Please fill all fields" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = await User({
      username,
      email,
      password: hash,
      firstName,
      lastName,
    });

    newUser
      .save()
      .then((user) => {
        res.status(200).json({ message: "User created successfully" });
      })
      .catch((err) => {
        if (err.keyValue.username) {
          res
            .status(500)
            .json({ message: "Username already exists", conflict: "username" });
        } else if (err.keyValue.email) {
          res
            .status(500)
            .json({ message: "Email already exists", conflict: "email" });
        } else {
          res.status(500).json({ message: "Error creating user" });
        }
      });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
