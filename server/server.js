// convert to requries
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const User = require("./models/user");
const app = express();

//configuration
dotenv.config();
app.use(cors());
app.use(helmet());
app.use(
  express.json({
    limit: "10mb",
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// server startup and database connection

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_PATH, {
    autoIndex: true,
  })
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log(
        `Database Connect & Server is running on port ${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

//routes and middleware
app.get("/", async (req, res, next) => {
  try {
    res.send("Hello World");
  } catch (error) {
    console.log(error);
  }
});
const authentication = require("./auth/authentication");
const admin = require("./routes/admin");

app.use("/auth", authentication);
app.use("/admin", admin);

app.use("*", (req, res) => {
  try {
    res.status(404).send("NOT FOUND");
  } catch (error) {
    console.log(error);
  }
});

app.use(async (req, res, next) => {
  try {
    res.status(500).send("SERVER ERROR");
  } catch (error) {
    console.log(error);
  }
});

process.on("uncaughtException", (err) => {
  console.log(err);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(err);
  console.log(promise);
});
