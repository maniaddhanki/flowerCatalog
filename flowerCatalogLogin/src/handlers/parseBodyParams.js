const parseParams = (searchParams) => {
  const params = new URLSearchParams(searchParams);
  const parsedParams = {};

  for (const [key, value] of params.entries()) {
    parsedParams[key] = value;
  }

  return parsedParams;
};

const parseBodyParams = (req, res, next) => {
  let payload = '';

  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    payload += chunk;
  });

  req.on('end', () => {
    req.bodyParams = parseParams(payload);
    req.body = payload;
    next();
  });
};

module.exports = { parseBodyParams };