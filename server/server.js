import express from "express";
import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
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

mongoose
  .connect(
    process.env.MONGO_PATH || "mongodb://localhost:27017/express-mongo",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(process.env.PORT, () => console.log("Starting Server"));
  })
  .catch((err) => console.log(err))
  .finally(() => console.log("Connected to DB && Server is running"));
