const { guestBookRouter } = require('./handlers/guestBookHandler.js');
const { staticHandler } = require('./handlers/staticHandler.js');
const { unFoundHandler } = require("./handlers/unFoundHandler");
const { createCache } = require('./fileCache/createCache.js');
const { dependencyHandler } = require("./handlers/dependencyHandler");
const { createRouter } = require('./asyncRouter.js');
const { parseUrl } = require('./handlers/parseUrl.js');
const { logHandler } = require('./handlers/logger.js');
const { parseBodyParams } = require('./handlers/parseBodyParams.js');
const { injectCookie } = require('./handlers/cookiesHandler.js');
const { loginHandler } = require('./handlers/loginHandler.js');
// const { signupHandler } = require('./handlers/signupHandler.js');
const { injectSession } = require('./handlers/sessionHandler.js');
const { logoutHandler } = require('./handlers/logoutHandler.js');
const { apiHandler } = require('./handlers/apiHandler.js');
const { serveFileContent } = require('./handlers/serveFileContent.js');

const fileContents = {};

const createApp = ({ root = './public', logger = () => { } }, sessions = {}, users = {}) => {
  createCache(root, fileContents);

  const handlers = [parseUrl, logHandler(logger), parseBodyParams, dependencyHandler(fileContents), injectCookie, injectSession(sessions), loginHandler(sessions), logoutHandler(sessions), staticHandler, apiHandler, guestBookRouter, serveFileContent, unFoundHandler];

  return createRouter(handlers);
};

module.exports = { createApp };
