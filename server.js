import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
app.use(cookieParser());
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
//cloud
import cloudinary from "cloudinary";
//job-router
import jobRouter from "./router/jobRouter.js";
import authRouter from "./router/authRouter.js";
import userRouter from "./router/userRouter.js";

//public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//error Middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

dotenv.config();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./public")));
//cors
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    sameSite: "None",
  })
);

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.use(errorHandlerMiddleware);
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
