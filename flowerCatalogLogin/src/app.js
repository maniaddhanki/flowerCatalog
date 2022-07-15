const express = require('express');

const { validateUser, readComments, writeComment } = require('./handlers/guestBookHandler.js');
const { injectComments, injectTemplate } = require("./handlers/dependencyHandler");
const { logHandler } = require('./handlers/logger.js');
const { injectCookie } = require('./handlers/cookiesHandler.js');
const { loginHandler, validateRequest, showLoginPage } = require('./handlers/loginHandler.js');
const { injectSession } = require('./handlers/sessionHandler.js');
const { logoutHandler } = require('./handlers/logoutHandler.js');
const { apiHandler } = require('./handlers/apiHandler.js');

const createApp = ({ root = './public', logger = () => { } }, sessions = {}, users = {}) => {

  const app = express();
  app.use(express.static(root));
  app.use(express.static('src/frontEnd'));
  app.use(express.urlencoded({ extended: true }));

  app.use(injectCookie);
  app.use(injectSession(sessions));
  app.use(logHandler(logger));

  app.get('/login', showLoginPage);
  app.post('/login', validateRequest, loginHandler(sessions));
  app.get('/logout', logoutHandler(sessions));

  app.get('/guest-book', injectComments, injectTemplate, validateUser, readComments);
  app.post('/guest-book', injectComments, validateUser, writeComment);
  app.get('/api', injectComments, apiHandler);
  return app;
};

module.exports = { createApp };
