const logHandler = logger => (req, res, next) => {
  logger(req.headers);
  logger(req.url);
  next();
};

module.exports = { logHandler };
