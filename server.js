import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import mongoose from "mongoose";
import morgan from "morgan";
//job-router
import jobRouter from "./router/jobRouter.js";
//error Middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

dotenv.config();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});
// app.post("/api/v1/test", validateTest, (req, res) => {
//   const { name } = req.body;
//   res.json({ message: `hello ${name}` });
// });

app.use("/api/v1/jobs", jobRouter);

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
