const path = require('path');

const types = {
  jpg: 'image/jpg',
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  pdf: 'application/pdf',
  gif: 'application/gif'
};

const setType = fileName => {
  const extensionIndex = fileName.lastIndexOf('.');
  const extension = fileName.slice(extensionIndex + 1);
  return types[extension];
};

const serveFileContent = (request, response) => {
  const fileContent = request.fileContents;

  if (request.url.pathname === '/') {
    request.url.pathname = 'home-page.html';
  }

  const filePath = path.parse(request.url.pathname);

  if (!fileContent[filePath.base]) {
    return false;
  }

  response.statusCode = 200;
  response.setHeader('content-type', setType(filePath.base));
  response.end(fileContent[filePath.base]);
  return true;
};

module.exports = { serveFileContent };
