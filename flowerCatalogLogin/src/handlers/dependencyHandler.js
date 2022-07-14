const fs = require('fs');

const dependencyHandler = fileContents => (req, res, next) => {
  const { pathname } = req.url;
  const { method } = req;

  if (pathname === '/guest-book' || pathname === '/api') {
    const comments = fs.readFileSync('src/data/comments.json', 'utf8');
    req.comments = JSON.parse(comments);
  }

  if (pathname === '/guest-book' && method === 'GET') {
    req.form = fs.readFileSync('src/template/comment-form.html', 'utf8');
  }

  req.fileContents = fileContents;
  next();
};

module.exports = { dependencyHandler };