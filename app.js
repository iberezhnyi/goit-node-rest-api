import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import contactsRouter from "./routes/contactsRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, _, res, next) => {
  const { status = 500, message } = err;

  const messageText =
    status === 500 ? `Server error! Details: ${message}` : message;

  res.status(status).json({
    message: messageText,
  });

  console.error(
    "\x1B[31m Error! ---> \x1b[0m",
    `\x1B[31m${status}\x1b[0m`,
    messageText
  );
});

const DB_HOST = process.env.DB_HOST;

// const DB_HOST =
// "mongodb+srv://iberezhnyi:gvzxNXFEHXzLpuyg@cluster0.9cydex4.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running. Use our API on port: 3000");
    });
    console.log("Database connection successful!");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
