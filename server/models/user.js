import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unqiue: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unqiue: true,
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
});

const User = mongoose.model("User", userSchema);
