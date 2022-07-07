const fs = require('fs');

const dependencyHandler = fileContents => (req, res, next) => {
  const { pathname } = req.url;
  if (pathname === '/read-comments') {
    const comments = fs.readFileSync('src/data/comments.json', 'utf8');
    req.comments = JSON.parse(comments);
    req.form = fs.readFileSync('src/template/comment-form.html', 'utf8');
  }
  if (pathname === '/write-comment') {
    const comments = fs.readFileSync('src/data/comments.json', 'utf8');
    req.comments = JSON.parse(comments);
  }
  req.fileContents = fileContents;
  next();
};

module.exports = { dependencyHandler };