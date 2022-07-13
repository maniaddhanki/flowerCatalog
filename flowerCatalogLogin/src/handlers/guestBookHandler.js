const fs = require('fs');
const toHtml = (body, tag) => `<${tag}>${body}</${tag}>`;

const presist = commentLog => {
  fs.writeFileSync('src/data/comments.json', JSON.stringify(commentLog), 'utf8');
};

const writeComment = (request, response, next) => {
  const { comments } = request
  const { name, comment } = request.bodyParams;
  const date = new Date();
  const dateTime = date.toLocaleString();
  comments.unshift({ dateTime, name, comment });
  presist(comments);
  response.statusCode = 201;
  response.end();
};

const toString = comment => {
  const commentFields = Object.values(comment);
  return commentFields.join(' ');
};

const readComments = (request, response, next) => {
  const { comments, form } = request;
  const commentLog = comments.map(comment => toHtml(toString(comment), 'li'));
  const commentList = toHtml(commentLog.join(''), 'ol');
  const guestBook = form.replace('--comments--', commentList);

  response.setHeader('content-type', 'text/html');
  response.end(guestBook);
};

const redirect = (req, res) => {
  res.statusCode = 302;
  res.setHeader('location', '/login');
  res.end('login to guestBook');
}

const guestBookHandler = (request, response, next) => {
  const { pathname } = request.url;
  const { method } = request;

  if (!request.session) {
    redirect(request, response, next);
    return;
  };

  if (pathname === '/write-comment' && method === 'POST') {
    return writeComment(request, response, next);
  }
  if (pathname === '/read-comments' && method === 'GET') {
    return readComments(request, response, next);
  }
  next();
};

module.exports = { guestBookHandler };
