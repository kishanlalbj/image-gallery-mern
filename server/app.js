const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` });
const imageRouter = require("./router/image");
const authRouter = require("./auth");
const app = express();

const mongoose = require("mongoose");
const path = require("path");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    origin: "http://172.30.240.1:5173"
  })
);
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "client", "dist")));
app.use("/images", express.static(path.join(__dirname, "uploads")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/dist/index.html"));
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", imageRouter);
app.use("/api/auth", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}  🚀`);
});
