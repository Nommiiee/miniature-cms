// convert to requries
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const app = express();

// MongoDB Models
const User = require("./models/user");

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
  .connect(
    process.env.MONGO_PATH || "mongodb://127.0.0.1:27017/miniature-CMS",
    {
      autoIndex: true,
    }
  )
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

if (process.env.MODE === "production") {
  mongoose.connection.on("connected", () => {
    User.ensureIndexes((err) => {
      if (err) console.log(err);
      console.log("Indexes created");
    });
  });
}

const authentication = require("./auth/authentication");
const admin = require("./routes/admin");

app.use("/auth", authentication);
app.use("/admin", admin);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "localhost");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("*", (req, res) => {
  try {
    res.status(404).send("NOT FOUND");
  } catch (error) {
    console.log(error);
  }
});

app.use((err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

process.on("uncaughtException", (err) => {
  console.log(err);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(err);
  console.log(promise);
});
