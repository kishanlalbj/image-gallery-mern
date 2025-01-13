const notFound = (req, res, next) => {
  res.status(404).json({ success: false, result: `${req.url} Not Found` });
  next();
};

module.exports = notFound;
