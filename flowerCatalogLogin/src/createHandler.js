const createHandler = (handlers, fileContents) => {
  return (request, response) => {
    request.fileContents = fileContents;
    request.url = new URL(`http://${request.headers.host}${request.url}`);

    for (handler of handlers) {
      if (handler(request, response)) {
        return true;
      }
    }
    return false;
  };
};

exports.createHandler = createHandler;
