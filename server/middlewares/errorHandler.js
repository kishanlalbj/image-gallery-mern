module.exports = (error, req, res, next) => {
  console.log(error);
  const status = error.statusCode;
  const message = error.message;

  const obj = {
    success: false,
    status,
    message
  };

  if (process.env.NODE_ENV !== "production") obj["stack"] = error.stack;

  res.status(status).send(obj);
};
