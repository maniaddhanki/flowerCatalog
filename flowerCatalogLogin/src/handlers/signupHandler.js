const signupHandler = (users) => (req, res, next) => {
  const { pathname } = req.url;
  const { method } = req;
  const { username, password } = req.bodyParams;

  if (pathname !== '/signup') {
    return next();
  }

  if (method === 'GET') {
    res.statusCode = 302;
    res.setHeader('location', '/signup.html');
    res.end();
  }

  if (method === 'post') {
    if (users[username]) {
      res.statusCode = 405;
      res.end('User already exists');
      return;
    }

    const credentials = { username };
    users[username] = credentials;
    res.statusCode = 200;
    res.end('succesfull');
  }
};

module.exports = { signupHandler };
