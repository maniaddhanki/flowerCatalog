const fs = require('fs');

const serveFileContent = ({ uri }, response, fileContent) => {
  if (uri === '/') {
    uri = '/index.html';
  }

  if (!fileContent[uri.slice(1)]) {
    return false;
  }

  response.send(fileContent[uri.slice(1)]);
  return true;
};

module.exports = { serveFileContent };
