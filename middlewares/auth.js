const jsonwebtoken = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');
const ForbiddenError = require('../errors/forbidden-err');

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
    jsonwebtoken.verify(jwt, 'd14c698d0500ab4a6ee06a893dd351dd5d5b3c53cbd6692ed0d900d615bc5ec3', (err, decoded) => {
      if (err) {
        throw new ForbiddenError('Недостаточно прав. Необходима авторизация');
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    next(err);
  }
};

module.exports = auth;
