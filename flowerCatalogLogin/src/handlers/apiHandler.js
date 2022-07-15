const apiHandler = (req, res, next) => {
  const comments = JSON.stringify(req.comments);
  res.setHeader('content-type', 'application/json');
  res.end(comments);
  return;
};

module.exports = { apiHandler };