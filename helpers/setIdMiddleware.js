const setIdMiddleware = (req, res, next) => {
  req.user = {
    _id: '60cafd14980333156caea7ed',
  };
  next();
};

module.exports = setIdMiddleware;
