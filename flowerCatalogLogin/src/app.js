const { guestBookHandler } = require('./handlers/guestBookHandler.js');
const { serveFileContent } = require('./handlers/serveFileContent.js');
const { unFoundHandler } = require("./handlers/unFoundHandler");
const { createCache } = require('./fileCache/createCache.js');
const { dependencyHandler } = require("./handlers/dependencyHandler");
const { createRouter } = require('./asyncRouter.js');
const { parseUrl } = require('./handlers/parseUrl.js');
const { parseBodyParams } = require('./handlers/parseBodyParams.js');
const { injectCookie } = require('./handlers/cookiesHandler.js');
const { loginHandler } = require('./handlers/loginHandler.js');
const { protectedHandler } = require('./handlers/protectedHandler.js');
const { injectSession } = require('./handlers/sessionHandler.js');
const { logoutHandler } = require('./handlers/logoutHandler.js');

const sessions = {};
const fileContents = {};

const handlers = [parseUrl, parseBodyParams, dependencyHandler(fileContents), injectCookie, injectSession(sessions), loginHandler(sessions), logoutHandler(sessions), protectedHandler, guestBookHandler, serveFileContent, unFoundHandler];

createCache('./public', fileContents);

const app = () => createRouter(handlers);

module.exports = { app };
