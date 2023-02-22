const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
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
    unqiue: true,
    required: true,
    dropDups: true,
    minlength: 3,
  },
  email: {
    type: String,
    unqiue: true,
    required: true,
    dropDups: true,
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

  timestamp: {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
