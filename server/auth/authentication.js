const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const router = express.Router();
const validator = require("validator");
const { normalizePath } = require("vite");

router.post("/register", async (req, res, next) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    validator.escape(username);
    validator.escape(email);
    validator.escape(password);
    validator.escape(firstName);
    validator.escape(lastName);

    if (!validator.isEmail(email)) {
      return res.status(500).json({ message: "Please enter a valid email" });
    }

    const emailWithoutPlus = email.replace(/\+.+@/, "@");
    const normalizeEmail = validator.normalizeEmail(emailWithoutPlus, {
      all_lowercase: true,
      gmail_convert_googlemaildotcom: true,
      gmail_remove_subaddress: true,
      gmail_remove_dots: true,
      outlookdotcom_remove_subaddress: true,
      yahoo_remove_subaddress: true,
      icloud_remove_subaddress: true,
    });

    if (
      !username ||
      !emailWithoutPlus ||
      !password ||
      !firstName ||
      !lastName
    ) {
      return res.status(500).json({ message: "Please fill all fields" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await User({
      username,
      email: emailWithoutPlus,
      password: hashedPassword,
      firstName,
      lastName,
    });

    newUser
      .save()
      .then((user) => {
        res.status(200).json({ message: "User created successfully", user });
      })
      .catch((err) => {
        if (err.keyValue.username) {
          res
            .status(500)
            .json({ message: "Username already exists", conflict: "username" });
        } else if (err.keyValue.email) {
          res
            .status(500)
            .json({ message: "Email already exists", conflict: "email" });
        } else {
          res.status(500).json({ message: "Error creating user" });
        }
      });
  } catch (error) {
    console.log(error);
  }
});

// async function emailValdator(email) {
//   try {
//     const user = await User.findOne({ email });
//     if (user) {
//       return false;
//     } else {
//       return true;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

module.exports = router;
