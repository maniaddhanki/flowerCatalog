const fs = require('fs');

const apiHandler = (req, res, next) => {
  if (req.url.pathname === '/api') {

    const comments = JSON.stringify(req.comments);
    res.setHeader('content-type', 'application/json');
    res.end(comments);
    return;
  }
  next();
};

module.exports = { apiHandler };