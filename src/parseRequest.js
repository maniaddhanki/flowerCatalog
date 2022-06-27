const parseHeaders = (lines) => {
  const headers = {};
  let index = 0;
  while (index < lines.length && lines[index].length > 0) {
    const header = lines[index];
    let keyIndex = header.indexOf(':');
    const key = header.slice(0, keyIndex);
    const value = header.slice(++keyIndex);
    headers[key] = value;
    index++;
  }
  return headers;
};

const parseRequestLine = (line) => {
  return line.split(' ');
};

const parseUri = rawUri => {
  const queryArgs = {};
  const [uri, queryString] = rawUri.split('?');

  if (queryString) {
    const parms = queryString.split('&');

    parms.forEach(param => {
      const [key, value] = param.split('=');
      queryArgs[key] = value;
    })
  }
  return [uri, queryArgs];
};

const parseRequest = (request) => {
  const lines = request.trim().split('\r\n');
  const [method, rawUri, httpVersion] = parseRequestLine(lines[0]);
  const [uri, queryArgs] = parseUri(rawUri);
  const headers = parseHeaders(lines.slice(1));
  return { method, uri, queryArgs, httpVersion, headers };
};

module.exports = { parseRequest, parseRequestLine, parseHeaders };
