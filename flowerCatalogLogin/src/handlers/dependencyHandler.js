const fs = require('fs');

const injectComments = (req, res, next) => {
  const comments = fs.readFileSync('src/data/comments.json', 'utf8');
  req.comments = JSON.parse(comments);

  next();
};

const injectTemplate = (req, res, next) => {
  req.form = fs.readFileSync('src/template/comment-form.html', 'utf8');
  next();
};

module.exports = { injectComments, injectTemplate };