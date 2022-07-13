const makeXhr = (callBack, { method, url }, body = '') => {
  const xhr = new XMLHttpRequest();
  console.log(`sending ${method} ${url} with ${body}`);
  xhr.onload = callBack.bind(null, xhr);
  xhr.open(method, url);
  xhr.send(body);
};

const parseForm = () => {
  const form = document.querySelector('form');
  const formData = new FormData(form);
  const parsedForm = new URLSearchParams(formData);
  return parsedForm.toString();
};

const showStatus = (xhr) => {
  const body = document.querySelector('body');
  const status = xhr.status;
  const login = document.createElement('a');
  login.href = '/login';
  let message = 'couldn\'t sign up';
  if (status === 201) {
    message = 'signed up succesfully';
  }

  body.innerText = message;
  body.innerHTML = login
};

const main = () => {
  const signup = document.querySelector('#signup');
  const request = { method: 'post', url: 'localhost:8080/signup' };
  signup.onclick = makeXhr(showStatus, request, parseForm());
};

window.onload = main;