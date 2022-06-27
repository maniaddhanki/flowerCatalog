const fs = require('fs');

const toHtml = (body, tag) => `<${tag}>${body}</${tag}>`;

const comments = [];

const writeComment = (queryArgs, response) => {
  const { name, comment } = queryArgs;
  const date = new Date();
  const dateTime = date.toLocaleString();
  comments.unshift({ dateTime, name, comment });
  readComments(queryArgs, response);
};

const toString = (comment) => {
  return comment.dateTime + ' ' + comment.name + ' ' + comment.comment;
};

const styleTag = css => `<link rel="stylesheet" href="${css}"/>`;

const readComments = (queryArgs, response) => {
  const form = fs.readFileSync('public/comment-form.html', 'utf8');
  const commentlist = comments.map(comment => toHtml(toString(comment), 'li'));
  const sectionHeading = toHtml('Datetime_Name_Comment', 'h2');
  const commentSection = toHtml(sectionHeading + commentlist.join(''), 'section');
  const title = toHtml('Guest Book', 'title');
  const link = styleTag('form.css');
  const head = toHtml(title + link, 'head');
  const body = toHtml(form + commentSection, 'body');
  response.send(toHtml(head + body, 'html'));
  return true;
};

const dynamicHandler = ({ uri, queryArgs }, response) => {
  if (uri === '/write-comment') {
    return writeComment(queryArgs, response);
  }
  if (uri === '/read-comments') {
    return readComments(queryArgs, response);
  }

  return false;
};

module.exports = { dynamicHandler };
