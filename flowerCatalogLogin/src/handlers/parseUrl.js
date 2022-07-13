const parseUrl = (req, res, next) => {
  req.url = new URL(`http://${req.headers.host}${req.url}`);
  next();
};

module.exports = { parseUrl };
