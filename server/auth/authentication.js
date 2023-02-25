const express = require("express");
const passport = require("passport");
const router = express.Router();
const validator = require("validator");

// passportJS Authentication login route
router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) throw err;
    if (!user) {
      return res.status(500).json({
        message: "Invalid username or password",
        err: true,
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Invalid username or password",
          err: true,
        });
      }

      res.status(200).json({
        message: "You have successfully logged in",
        user,
        err: false,
      });
    });
  })(req, res, next);
});

router.post("/register", async (req, res, next) => {
  try {
    const User = require("../models/user");
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
      firstName: validator.blacklist(
        firstName.toLowerCase(),
        "0123456789!@#$%^&*()_+<>[] /"
      ),
      lastName: validator.blacklist(
        lastName.toLowerCase(),
        "0123456789!@#$%^&*()_+<>[] /"
      ),
      username: username.replace(/\s/g, "").toLowerCase(),
      email: normalizeEmail.replace(/\s/g, "").toLowerCase(),
      password: password.replace(/\s/g, "").trim(),
    });

    newUser
      .save()
      .then((user) => {
        res
          .status(200)
          .json({ message: "Registration Successful!", user, err: false });
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

router.get("/logout", async function (req, res) {
  try {
    console.log(req.session);
    req.logout(function (err) {
      if (err) throw err;
    });
    req.session.destroy((err) => {
      if (err) throw err;
      res.clearCookie("miniature-id");
      res.json({ message: "Session destroyed" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging out" });
  }
});

module.exports = router;
