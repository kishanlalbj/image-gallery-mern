const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: `./.env.${process.env.NODE_ENV}` });
const imageRouter = require("./router/image");
const authRouter = require("./auth");
const app = express();

const mongoose = require("mongoose");
const path = require("path");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "client", "dist")));
app.use("/images", express.static(path.join(__dirname, "uploads")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/dist/index.html"));
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", imageRouter);
app.use("/api/v1/auth", authRouter);

app.use(errorHandler);
app.use(notFound);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}  🚀`);
});
