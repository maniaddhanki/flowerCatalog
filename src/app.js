const { guestBookHandler } = require('./handlers/guestBookHandler.js');
const { serveFileContent } = require('./handlers/serveFileContent.js');
const { unFoundHandler } = require("./handlers/unFoundHandler");
const { createHandler } = require('./createHandler.js');
const { createCache } = require('./fileCache/createCache.js');
const { dependencyHandler } = require("./handlers/dependencyHandler");

const handlers = [guestBookHandler, serveFileContent, unFoundHandler];

const fileContents = {};
createCache('./public', fileContents);

const app = () => createHandler(handlers, fileContents);

module.exports = { app };
