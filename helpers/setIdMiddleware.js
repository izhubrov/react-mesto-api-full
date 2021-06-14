const setIdMiddleware = (req, res, next) => {
  req.user = {
    _id: '60c484564d15081038b3c18f',
  };
  next();
};

module.exports = setIdMiddleware;
