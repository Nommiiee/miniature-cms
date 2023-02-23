const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const router = express.Router();
const validator = require("validator");

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    if (!username || !email || !password || !firstName || !lastName) {
      return res
        .status(500)
        .json({ message: "Please fill all fields", conflict: "all" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(500)
        .json({ message: "Please enter a valid email", conflict: "email" });
    }

    const emailWithoutPlus = email.replace(/\+.+@/, "@");
    const normalizeEmail = validator.normalizeEmail(emailWithoutPlus, {
      all_lowercase: true,
      gmail_convert_googlemaildotcom: true,
      gmail_remove_subaddress: true,
      gmail_remove_dots: true,
      outlookdotcom_remove_subaddress: true,
      yahoo_remove_subaddress: true,
      icloud_remove_subaddress: true,
    });

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User({
      firstName,
      lastName,
      username,
      email: normalizeEmail,
      password,
    });

    newUser
      .save()
      .then((user) => {
        res.status(200).json({ message: "User created", user });
      })
      .catch((error) => {
        if (error.code === 11000) {
          if (error.keyPattern.username) {
            return res.status(500).json({
              message: "Username already exists",
              conflict: "username",
            });
          }
          if (error.keyPattern.email) {
            return res
              .status(500)
              .json({ message: "Email already exists", conflict: "email" });
          }
        }
        console.log(error);
        res.status(500).json({ message: "Error creating user" });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
});

async function testRegistration() {
  const req = {
    body: {
      username: "nomnom",
      password: "12345678",
      email: "nom@nomnom1.com",
      firstName: "NoaAWdsxm",
      lastName: "Nom",
      isAdmin: "false",
      role: "user",
    },
  };

  const { username, email, password, firstName, lastName } = req.body;

  if (!username || !email || !password || !firstName || !lastName) {
    console.log("Please fill all fields");
  }

  if (!validator.isEmail(email)) {
    console.log("Please enter a valid email");
  }

  const emailWithoutPlus = email.replace(/\+.+@/, "@");
  const normalizeEmail = validator.normalizeEmail(emailWithoutPlus, {
    all_lowercase: true,
    gmail_convert_googlemaildotcom: true,
    gmail_remove_subaddress: true,
    gmail_remove_dots: true,
    outlookdotcom_remove_subaddress: true,
    yahoo_remove_subaddress: true,
    icloud_remove_subaddress: true,
  });

  const newUser = await User({
    firstName,
    lastName,
    email: normalizeEmail,
    username,
    password,
  });

  newUser
    .save()
    .then((user) => {
      console.log(user);

      User.deleteMany({}).then(() => {
        console.log("Deleted all users");
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = router;
