import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
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
const mongoPath = "mongodb://127.0.0.1:27017/miniature-CMS";
mongoose.set("strictQuery", false);

// server startup and database connection
mongoose
  .connect(process.env.MONGO_PATH || mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
