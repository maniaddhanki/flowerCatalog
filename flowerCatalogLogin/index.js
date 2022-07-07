const { app } = require('./src/app.js');
const { startServer } = require('./src/server/server.js');

startServer(8080, app());
