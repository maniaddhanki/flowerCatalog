const injectSession = (sessions) => (req, res, next) => {
  const { sessionId } = req.cookies;
  req.session = sessions[sessionId];
  next();
};

module.exports = { injectSession };
