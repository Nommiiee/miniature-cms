// convert to requries
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const mongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const app = express();

const MONGO_PATH =
  process.env.mongo_PATH || "mongodb://127.0.0.1:27017/miniature-CMS";
const PORT = process.env.PORT || 3001;
const sizeLimit = "20mb";

// MongoDB Models
const User = require("./models/user");

//configuration
dotenv.config();
app.use(cors());
app.use(helmet());
app.use(
  express.json({
    limit: sizeLimit,
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: sizeLimit,
  })
);
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    name: "miniature-id",
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    store: mongoStore.create({
      mongoUrl: MONGO_PATH,
    }),
  })
);
// cookie and body parser
app.use(cookieParser());
app.use(
  bodyParser.json({
    limit: sizeLimit,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

// passport
app.use(passport.session());
app.use(passport.session());

// server startup and database connection

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_PATH, {
    autoIndex: true,
  })
  .then(() => {
    app.listen(PORT, () => {
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

//Routes and middleware
const authentication = require("./auth/authentication");
const admin = require("./routes/admin");

app.use("/auth", authentication);
app.use("/admin", admin);

// app.use(function (req, res, next) {
//  res.header("Access-Control-Allow-Origin", "localhost");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// app.use("*", (req, res) => {
//   try {
//     res.status(404).send("NOT FOUND");
//   } catch (error) {
//     console.log(error);
//   }
// });

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
