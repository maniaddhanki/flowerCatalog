const { createServer } = require('net');
const { parseRequest } = require('./src/parseRequest.js');
const { dynamicHandler } = require('./src/dynamicHandler.js');
const { serveFileContent } = require('./src/serveFileContent.js');
const { Response } = require('./src/response.js');
const { createCache } = require('./src/createCache.js');

const unFoundHandler = (request, response) => {
  response.status = 404;
  response.setHeaders('content-type', 'text/plain');
  response.send('Not found');
  return true;
}

const handle = (request, response) => {
  for (handler of handlers) {
    if (handler(request, response, fileContent)) {
      return true;
    }
  }
  return false;
};

const onConnection = (socket) => {
  socket.setEncoding('utf8');
  socket.on('data', (chunk) => {
    const request = parseRequest(chunk);
    const response = new Response(socket);
    handle(request, response);
    console.log(request);
  });

  socket.on('error', (err) => console.log(err));
};

const launchServer = (Port, directory = 'public') => {
  createCache(directory, fileContent);
  const server = createServer(socket => onConnection(socket));
  server.listen(Port, () => console.log(`connected to ${Port}`));
};

const fileContent = {}

const handlers = [dynamicHandler, serveFileContent, unFoundHandler];

const [directory] = process.argv.slice(2);

launchServer(8000, directory);
