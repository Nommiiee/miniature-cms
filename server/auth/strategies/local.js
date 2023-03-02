const express = require("express");
const User = require("../../models/user");
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

function injectStrategy() {
  passport.use(
    "local",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          // Find the user associated with the email provided by the user
          const user = await User.findOne({ username: username.toLowerCase() });

          // If the user doesn't exist or the password is incorrect
          if (!user || !(await bcrypt.compare(password, user.password))) {
            return done(null, false, { message: "Invalid email or password" });
          }

          // If the user exists and the password is correct
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
}

module.exports = { injectStrategy };
