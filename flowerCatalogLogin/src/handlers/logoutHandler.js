const logoutHandler = (sessions) => (req, res, next) => {
  if (req.session) {
    delete sessions[req.session.sessionId];
  }
  res.setHeader('set-cookie', 'id=0;max-age=0');
  res.end('Loged out success fully');
};

module.exports = { logoutHandler };
