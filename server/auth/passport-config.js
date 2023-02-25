const User = require("../models/user");
const passport = require("passport");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user, err) => {
    done(err, user);
  });
});

module.exports = passport;
