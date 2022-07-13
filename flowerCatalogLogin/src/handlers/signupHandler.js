const signupHandler = (users) => (req, res, next) => {
  const { pathname } = req.url;
  const { username, password } = req.bodyParams;

  if (pathname !== '/signup') {
    return next();
  }

  if (users[username]) {
    res.statusCode = 405;
    res.end('User already exists');
    return;
  }

  const credentials = { username, password };
  users[username] = credentials;
  res.statusCode = 200;
  res.end('succesfull');
};

module.exports = { signupHandler };
