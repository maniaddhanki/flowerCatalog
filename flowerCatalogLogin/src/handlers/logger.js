const logHandler = logger => (req, res, next) => {
  logger(req.method);
  logger(req.url);
  next();
};

module.exports = { logHandler };
