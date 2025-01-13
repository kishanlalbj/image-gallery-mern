const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const HttpError = require("../utils/HttpError");
const generateAccessToken = require("../utils/generateAccessToken");
const verifyJwt = require("../middlewares/verifyJwt");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      throw new HttpError(400, "All fields required");
    }

    const userExists = await User.findOne({ email }).select({ email }).exec();
    if (userExists) throw new HttpError(404, "Email already exists");

    const newuser = new User({
      email,
      password,
      firstName,
      lastName
    });

    const user = await newuser.save();

    res.send({ user: user._id });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new HttpError(400, "All fields Required");

    const user = await User.findOne({ email });

    if (!user) throw new HttpError(404, "User not found");

    const isValid = await user.isValidPassword(password);

    if (!isValid) throw new HttpError(401, "Incorrect credentials");

    const token = await generateAccessToken({
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email
    });

    const refreshToken = await generateAccessToken({ id: user._id }, "refresh");

    res.cookie("rtk", refreshToken, {
      httpOnly: true,
      secure: true
    });

    return res.send({ success: true, message: token });
  } catch (error) {
    next(error);
  }
});

router.get("/refresh-token", (req, res, next) => {
  try {
    const cookies = req.cookies;

    if (!cookies.rtk) throw new HttpError(403, "Forbidden");

    jwt.verify(
      cookies?.rtk,
      process.env.JWT_REFRESH_SECRET,
      async (error, payload) => {
        if (error) {
          throw new HttpError(401, "Forbidden");
        }

        req.user = payload;

        const user = await User.findById(req.user.id);

        const access_token = await generateAccessToken({
          id: user._id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          iat: Math.floor(Date.now() / 1000) - 30
        });

        res.send({ success: true, access_token });
      }
    );
  } catch (error) {
    next(error);
  }
});

router.get("/me", verifyJwt, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) throw new HttpError(403, "Unauhorized");

    res.send({ success: true });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", verifyJwt, async (req, res, next) => {
  try {
    res.clearCookie("rtk");

    res.send({ success: true, message: "Loggedout" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
