const protectedHandler = (req, res, next) => {
  if (req.session) {
    next();
    return;
  }

  res.statusCode = 302;
  res.setHeader('location', '/login');
  res.end('');
};

module.exports = { protectedHandler };
