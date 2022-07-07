const loginPage = `<html>
<head>
  <title>login</title>
</head>
<body>
  <form action="/login" method="post">
    <label for="username">Username</label>
  <input type="text" name="username" id="name">
  <input type="submit" value="submit">
  </form>
</body>
</html>`;

const showLoginPage = (req, res) => {
  res.setHeader('content-type', 'text/html');
  res.end(loginPage);
};

const generateSessionId = () => {
  return new Date().getTime();
};

const createSession = (username, sessionId) => {
  const time = new Date();
  return { username, time, sessionId };
};

const loginHandler = (sessions) => (req, res, next) => {
  const { pathname } = req.url;

  if (pathname !== '/login') {
    next();
    return;
  }

  if (req.session) {
    res.statusCode = 302;
    res.setHeader('Location', '/protected');
    res.end('already logged in');
    return;
  }

  if (req.method === 'GET') {
    showLoginPage(req, res);
    return;
  }

  const username = req.bodyParams.username;

  if (req.method === 'POST' && username) {
    const sessionId = generateSessionId();
    const session = createSession(username, sessionId);
    sessions[sessionId] = session;

    res.setHeader('Set-Cookie', `sessionId=${sessionId}`);
    res.statusCode = 302;
    res.setHeader('location', '/');
    res.end('');
  }
};

module.exports = { loginHandler };
