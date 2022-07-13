const makeXhr = (callBack, { method, url }, body = '') => {
  const xhr = new XMLHttpRequest();
  xhr.onload = callBack.bind(null, xhr);
  xhr.open(method, url);
  xhr.send(body);
};

const toString = comment => {
  const entries = Object.values(comment);
  return entries.join(' ');
};

const toHtml = (comments) => {
  const commentElements = comments.map(comment => {
    const li = document.createElement('li');
    li.innerText = toString(comment);
    return li;
  })
  return commentElements;
};

const writeComments = (commentElements) => {
  const commentList = document.querySelector('#comment-list');
  const orderedList = document.createElement('ol');
  commentList.innerText = null;
  commentList.appendChild(orderedList);
  commentElements.forEach(comment => orderedList.appendChild(comment));
};

const parseComments = (xhr) => {
  const comments = JSON.parse(xhr.response);
  const commentElements = toHtml(comments);
  writeComments(commentElements);
};

const upDateComments = (xhr) => {
  if (xhr.status === 201) {
    const request = {
      method: 'GET',
      url: 'http://localhost:8080/api.read-comments'
    };
    makeXhr(parseComments, request);
  }
};

const clearForm = () => {
  const name = document.querySelector('#name');
  const comment = document.querySelector('#comment');
  name.value = '';
  comment.value = '';
};

const parseForm = () => {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  const parsedForm = new URLSearchParams(formData);
  clearForm();
  return parsedForm.toString();
};

const main = () => {
  const submit = document.querySelector('#submit');
  const request = {
    method: 'POST',
    url: 'http://localhost:8080/guest-book'
  };
  submit.onclick = () => {
    makeXhr(upDateComments, request, parseForm());
  };
};

window.onload = main;
