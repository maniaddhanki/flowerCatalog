const { createServer } = require('http');

const startServer = (port, handler) => {
  const server = createServer(handler);
  server.listen(port, () => console.log(`listening on ${server.address().port}`));
};

module.exports = { startServer };
