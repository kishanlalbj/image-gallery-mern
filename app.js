const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` });
const imageRouter = require("./router/image");
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
    origin: "http://localhost:5173"
  })
);
app.use(morgan("dev"));

// app.get("*", (req, res, next) => {
//   res.header("Access-Control-Allow-Methods", "POST, GET");
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header(`Access-Control-Allow-Headers`, `Content-Type`);
//   next();
// });

app.set("json spaces", 5);

app.use(express.static(path.join(__dirname, "client", "dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/dist/index.html"));
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", imageRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}  🚀`);
});
