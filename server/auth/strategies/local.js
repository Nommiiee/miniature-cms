const User = require("../../models/user");
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

function injectStrategy() {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      (username, password, done) => {
        User.findOne({ username: username })
          .then((user) => {
            if (!user) {
              return done(null, false, {
                message: "User Not Found",
              });
            }
            bcrypt.compare(password, password, (err, isMatch) => {
              if (err) throw err;

              if (isMatch) {
                console.log("User registered or logged in");
                return done(null, user);
              } else {
                console.log("Password incorrect");
                return done(null, false, { message: "Password incorrect" });
              }
            });
          })
          .catch((err) => {
            console.log(err);
            return done(null, false, { message: err });
          });
      }
    )
  );
}

module.exports = { injectStrategy };
