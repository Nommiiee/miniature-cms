const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

router.get("/allUser", async (req, res, next) => {
  try {
    const allUser = await User.find();
    res.json(allUser);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/allUser", async (req, res, next) => {
  try {
    const allUser = await User.deleteMany();
    res.json(allUser);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/drop", async (req, res, next) => {
  try {
    const allUser = await User.collection.drop();
    res.json(allUser);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
