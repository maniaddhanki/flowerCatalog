const { createApp } = require('./src/app.js');
const { startServer } = require('./src/server/server.js');

startServer(8080, createApp({ root: './public' }, {}));
