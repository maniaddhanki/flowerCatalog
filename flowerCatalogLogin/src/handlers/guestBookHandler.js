const fs = require('fs');
const toHtml = (body, tag) => `<${tag}>${body}</${tag}>`;

const redirect = (location, response) => {
  response.setHeader('location', location);
  response.statusCode = 302;
  response.end('');
};

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
  redirect('/read-comments', response);
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

const guestBookHandler = (request, response, next) => {
  const { pathname } = request.url;
  const { method } = request;

  if (pathname === '/write-comment' && method === 'POST') {
    return writeComment(request, response, next);
  }
  if (pathname === '/read-comments' && method === 'GET') {
    return readComments(request, response, next);
  }
  next();
};

module.exports = { guestBookHandler };
