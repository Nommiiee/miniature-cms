const User = require("../models/user");
const passport = require("passport");
const local = require("./strategies/local");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user, err) => {
    done(err, user);
  });
});

local.injectStrategy();

module.exports = passport;
