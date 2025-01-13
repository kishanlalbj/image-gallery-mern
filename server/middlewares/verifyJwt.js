const User = require("../models/User.js");
const HttpError = require("../utils/HttpError.js");
const jwt = require("jsonwebtoken");

const verifyJwt = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) throw new HttpError(401, "No Unauthorized");

    const token = authHeader.split(" ")[1];

    if (!token) throw new HttpError(401, "no token Unauthorized");

    jwt.verify(token, process.env.JWT_ACCESS_SECRET, async (err, payload) => {
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ message: "Unauthorized" });
      } else if (err instanceof jwt.JsonWebTokenError)
        return res
          .status(401)
          .json({ message: "invalid token", authenticated: false });

      const user = await User.findById(payload.id).lean();

      if (!user) return res.status(401).json({ message: "Unauthorized user" });

      req.user = payload;

      next();
    });
  } catch (error) {
    next(error);
  }
};

module.exports = verifyJwt;
