const mongoose = require("mongoose");

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
      index: {
        unique: true,
      },
    },
    email: {
      type: String,
      required: true,
      unqiue: true,
      min: 6,
      index: {
        unique: true,
      },
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
      default: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
User.createIndexes(({ username: 1 }, { unique: true }));
User.createIndexes(({ email: 1 }, { unique: true }));

module.exports = User;
