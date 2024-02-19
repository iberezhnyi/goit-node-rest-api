import express from "express";
import morgan from "morgan";
import cors from "cors";

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

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
