const types = {
  jpg: 'image/jpg',
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  pdf: 'application/pdf'
};

const setType = fileName => {
  const extensionIndex = fileName.lastIndexOf('.');
  const extension = fileName.slice(extensionIndex + 1);
  return types[extension];
};

const serveFileContent = ({ uri }, response, fileContent) => {
  if (uri === '/') {
    uri = '/home-page.html';
  }

  const fileName = uri.slice(1);

  if (!fileContent[fileName]) {
    return false;
  }

  response.setHeaders('content-type', setType(fileName));
  response.send(fileContent[fileName]);
  return true;
};

module.exports = { serveFileContent };
