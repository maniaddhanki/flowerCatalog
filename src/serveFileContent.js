const types = {
  jpg: 'image/jpg',
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  pdf: 'application/pdf'
};

const serveFileContent = ({ uri }, response, fileContent) => {
  if (uri === '/') {
    uri = '/home-page.html';
  }

  const fileName = uri.slice(1);

  if (!fileContent[fileName]) {
    return false;
  }

  const extensionIndex = fileName.lastIndexOf('.');
  const extension = fileName.slice(extensionIndex + 1);
  response.setHeaders('content-type', types[extension]);
  response.send(fileContent[fileName]);
  return true;
};

module.exports = { serveFileContent };
