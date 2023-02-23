const express = require("express");
const passport = require("passport");
const router = express.Router();
const validator = require("validator");
const User = require("../models/user");

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    if (!username || !email || !password || !firstName || !lastName) {
      return res.status(500).json({
        message: "Please fill all fields",
        conflict: "all",
        type: "empty",
        err: true,
      });
    }

    if (
      !validator.isAlpha(firstName) ||
      !validator.isAlpha(lastName) ||
      !validator.isAscii(firstName) ||
      !validator.isAscii(lastName)
    ) {
      return res.status(500).json({
        message: "Please enter a valid name",
        conflict: "name",
        type: "invalid",
        err: true,
      });
    }

    if (!validator.isAlphanumeric(username)) {
      return res.status(500).json({
        message: "Please enter a valid username",
        conflict: "username",
        type: "invalid",
        err: true,
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(500).json({
        message: "Please enter a valid email",
        conflict: "email",
        type: "invalid",
        err: true,
      });
    }

    if (!validator.isStrongPassword(password) || password.includes(" ")) {
      return res.status(500).json({
        message: "Password is not strong enough!",
        conflict: "password",
        type: "invalid",
        err: true,
      });
    }

    const normalizeEmail = validator.normalizeEmail(email, {
      all_lowercase: true,
      gmail_convert_googlemaildotcom: true,
      gmail_remove_subaddress: true,
      gmail_remove_dots: true,
      outlookdotcom_remove_subaddress: true,
      yahoo_remove_subaddress: true,
      icloud_remove_subaddress: true,
    });

    const newUser = await User({
      firstName: validator.blacklist(firstName, "0123456789!@#$%^&*()_+<>[] /"),
      lastName: validator.blacklist(lastName, "0123456789!@#$%^&*()_+<>[] /"),
      username: username.replace(/\s/g, ""),
      email: normalizeEmail.replace(/\s/g, ""),
      password: password.replace(/\s/g, ""),
    });

    newUser
      .save()
      .then((user) => {
        res
          .status(200)
          .json({ message: "Registration Successful!", err: false });
        next();
      })
      .catch((error) => {
        if (error.code === 11000) {
          if (error.keyPattern.username) {
            return res.status(500).json({
              message: "Username already exists",
              conflict: "username",
              type: "duplicate",
              err: true,
            });
          }
          if (error.keyPattern.email) {
            return res.status(500).json({
              message: "Email already exists",
              conflict: "email",
              type: "duplicate",
              err: true,
            });
          }
        }
        console.log(error);
        res.status(500).json({ message: "Error creating user" });
        next();
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
    next();
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
}

module.exports = router;