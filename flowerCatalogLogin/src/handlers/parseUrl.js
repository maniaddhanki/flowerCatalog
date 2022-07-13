const parseUrl = (req, res, next) => {
  req.url = new URL(`http://${req.headers.host}${req.url}`);
  console.log(req.method, req.url.pathname);
  next();
};

module.exports = { parseUrl };
