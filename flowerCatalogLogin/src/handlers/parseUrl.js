const parseUrl = (req, res, next) => {
  console.log('in parseUrl');
  req.url = new URL(`http://${req.headers.host}${req.url}`);
  next();
};

module.exports = { parseUrl };
