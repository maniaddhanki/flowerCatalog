const makeXhr = (callBack, { method, url }, body = '') => {
  const xhr = new XMLHttpRequest();
  console.log(`sending ${method} ${url} with ${body}`);
  xhr.onload = callBack.bind(null, xhr);
  xhr.open(method, url);
  xhr.send(body);
};

const toHtml = (comments) => {
  const commentElements = comments.map(comment => {
    const li = document.createElement('li');
    li.innerText = comment;
    return li;
  })
  return commentElements.join('');
};

const writeComments = (xhr) => {
  const commentList = document.querySelector('.comment-section > ol');
  const comments = JSON.parse(xhr.response);
  commentList.innerHtml = toHtml(comments);
};

const upDateComments = (xhr) => {
  if (xhr.status === 201) {
    const request = {
      method: 'GET',
      url: 'http://localhost:8080/api.read-comments'
    };
    makeXhr(writeComments, request);
  }
};

const parseForm = () => {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  const parsedForm = new URLSearchParams(formData);
  console.log(parsedForm.toString());
  return parsedForm.toString();
};

const main = () => {
  const submit = document.querySelector('#submit');
  const request = {
    method: 'POST',
    url: 'http://localhost:8080/write-comment'
  };
  submit.onclick = () => {
    makeXhr(upDateComments, request, parseForm());
  };
};

window.onload = main;
