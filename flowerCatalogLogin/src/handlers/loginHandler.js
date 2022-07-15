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

const validateRequest = (req, res, next) => {
  if (req.session) {
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end('already logged in');
    return;
  }
  next();
};

const loginHandler = (sessions) => (req, res, next) => {
  const username = req.body.username;

  if (!username) {
    res.statusCode = 405;
    res.end();
    return;
  }

  const sessionId = generateSessionId();
  const session = createSession(username, sessionId);
  sessions[sessionId] = session;

  res.setHeader('Set-Cookie', `sessionId=${sessionId}`);
  res.statusCode = 302;
  res.setHeader('location', '/guest-book');
  res.end();
};

module.exports = { loginHandler, showLoginPage, validateRequest };
