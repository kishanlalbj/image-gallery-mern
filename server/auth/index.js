const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log(req.body);

    if (!email || !password) {
      return res.status(400).send("All fields required");
    }

    const userExists = await User.findOne({ email }).select({ email });
    if (userExists) return res.status(409).send("Email already exists");

    const newuser = new User({
      email,
      password
    });

    const user = await newuser.save();

    res.send({ user: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(req.body);

    if (!email || !password) {
      return res.status(400).send("All fields required");
    }

    const user = await User.findOne({ email });

    if (!user) return res.status(404).send("User not found");

    const isValid = await user.isValidPassword(password);

    console.log(isValid);

    if (isValid) {
      const token = jwt.sign(
        {
          id: user._id
        },
        "SECRET",
        { expiresIn: "1h" }
      );

      const refreshToken = jwt.sign({ id: user._id }, "SECRET", {
        expiresIn: "1y"
      });

      res.cookie("rtk", refreshToken, {
        httpOnly: true,
        secure: true
      });

      return res.status(200).send(token);
    } else {
      return res.status(401).send("Login Failed");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
