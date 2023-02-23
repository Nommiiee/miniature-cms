const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      min: 3,
      required: true,
    },
    lastName: {
      type: String,
      min: 3,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unqiue: true,
      minlength: 3,
      index: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unqiue: true,
      min: 6,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 256,
    },
    profilePic: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator", "writer", "developer"],
      default: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const user = this;
  user.firstName = titleCase(user.firstName);
  user.lastName = titleCase(user.lastName);
  user.username = user.username.toLowerCase().trim();
  user.email = user.email.toLowerCase().replace(/\+.+@/, "@").trim();

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(12, function (saltErr, salt) {
      if (saltErr) return next(saltErr);
      bcrypt.hash(user.password.trim()  , salt, function (hashErr, hash) {
        if (hashErr) return next(hashErr);
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);

module.exports = User;

function titleCase(str) {
  const splitStr = str.toLowerCase().split(" ");
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ").trim();
}
