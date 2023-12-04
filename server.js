import express from "express";
import jobRouter from "./router/jobRouter.js";
import mongoose from "mongoose";
const app = express();

import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/api/v1/jobs", jobRouter);
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "something went wrong" });
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
