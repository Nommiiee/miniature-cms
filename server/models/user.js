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
    articles: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password") || !user.isNew) {
    return next();
  }

  if (!user.isModified("password") || !user.isNew) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(user.password.trim(), salt);
    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
