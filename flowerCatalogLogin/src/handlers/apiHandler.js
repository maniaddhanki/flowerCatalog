const fs = require('fs');

const apiHandler = (req, res, next) => {
  if (req.url.pathname === '/api.read-comments') {
    fs.readFile('./src/data/comments.json', (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end();
        return;
      }
      res.statusCode = 200;
      res.end(data);
    })
    return;
  }
  next();
};

module.exports = { apiHandler };