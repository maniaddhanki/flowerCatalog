const fs = require('fs');
const toHtml = (body, tag) => `<${tag}>${body}</${tag}>`;

const getData = (path) => {
  const data = fs.readFileSync(path, 'utf-8');
  return JSON.parse(data);
};

const redirect = (location, response) => {
  response.setHeader('location', location);
  response.statusCode = 302;
  response.end('');
  return true;
};

const parseComment = rawComment => {
  const comment = {};
  const entries = rawComment.entries();

  for ([key, value] of entries) {
    comment[key] = value;
  }

  return comment;
};

const presist = commentLog => {
  fs.writeFileSync('src/data/comments.json', JSON.stringify(commentLog), 'utf8');
};

const writeComment = (request, response) => {
  const commentLog = getData('./src/data/comments.json');
  const { name, comment } = parseComment(request.url.searchParams);
  const date = new Date();
  const dateTime = date.toLocaleString();
  commentLog.unshift({ dateTime, name, comment });
  presist(commentLog);
  return redirect('/read-comments', response);
};

const toString = comment => {
  const commentFields = Object.values(comment);
  return commentFields.join(' ');
};

const readComments = (request, response) => {
  const commentLog = getData('./src/data/comments.json');
  const form = fs.readFileSync('./src/template/comment-form.html', 'utf-8');
  const comments = commentLog.map(comment => toHtml(toString(comment), 'li'));
  const commentList = toHtml(comments.join(''), 'ol');
  const guestBook = form.replace('--comments--', commentList);

  response.setHeader('content-type', 'text/html');
  response.end(guestBook);
  return true;
};

const guestBookHandler = (request, response) => {
  if (request.url.pathname === '/write-comment') {
    return writeComment(request, response);
  }
  if (request.url.pathname === '/read-comments') {
    return readComments(request, response);
  }
  return false;
};

module.exports = { guestBookHandler };
