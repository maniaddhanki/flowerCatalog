const fs = require('fs');

const dependencyHandler = fileContents => (req, res, next) => {
  const { pathname } = req.url;
  const { method } = req;
  if (pathname === '/guest-book' && method === 'GET') {
    const comments = fs.readFileSync('src/data/comments.json', 'utf8');
    req.comments = JSON.parse(comments);
    req.form = fs.readFileSync('src/template/comment-form.html', 'utf8');

    // console.log('in dephandler at get');
  }

  if (pathname === '/guest-book' && method === 'POST') {
    const comments = fs.readFileSync('src/data/comments.json', 'utf8');
    req.comments = JSON.parse(comments);
  }
  req.fileContents = fileContents;
  next();
};

module.exports = { dependencyHandler };