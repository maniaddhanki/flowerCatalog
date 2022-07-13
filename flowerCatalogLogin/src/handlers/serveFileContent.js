const path = require('path');
const fs = require('fs');

const types = {
  jpg: 'image/jpg',
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  pdf: 'application/pdf',
  gif: 'application/gif',
  js: 'js/javascript'
};

const setType = ext => {
  return types[ext.slice(1)];
};

const serveFileContent = (request, response, next) => {
  const relpath = '.' + request.url.pathname;
  const filePath = path.parse(relpath);


  if (!fs.existsSync(relpath)) {
    return next();
  }

  fs.readFile(relpath, (err, data) => {
    if (err) {
      response.statusCode = 404;
      response.end();
      return;
    }
    response.statusCode = 200;
    response.setHeader('content-type', setType(filePath.ext));
    response.end(data);
  })
  return;
};

module.exports = { serveFileContent };
