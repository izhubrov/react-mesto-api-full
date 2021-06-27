const jsonwebtoken = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const { randomString } = require('../utils');

const auth = (req, res, next) => {
  const { jwt } = req.cookies;

  try {
    if (!jwt) {
      throw new UnauthorizedError('C токеном что-то не так');
    }
  } catch (err) {
    next(err);
  }

  try {
    jsonwebtoken.verify(jwt, randomString, (err, decoded) => {
      if (err) {
        throw new UnauthorizedError('Необходима авторизация');
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    next(err);
  }
};

module.exports = auth;
