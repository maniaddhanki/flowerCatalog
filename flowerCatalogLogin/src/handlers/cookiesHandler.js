const parseCookie = (cookiesString) => {
  const cookies = {};
  if (!cookiesString) {
    return cookies;
  }

  cookiesString.split(';').forEach(cookie => {
    const [name, value] = cookie.split('=');
    cookies[name.trim()] = value.trim();
  });

  return cookies;
};

const injectCookie = (req, res, next) => {
  req.cookies = parseCookie(req.headers.cookie);
  next();
};

module.exports = { injectCookie };
