const jsonwebtoken = require('jsonwebtoken');

const auth = (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt || !jwt.startsWith('Bearer ')) {
    return res.status(401).send({ message: 'C токеном что-то не так' });
  }
  const token = jwt.replace('Bearer ', '');
  let payload;

  try {
    payload = jsonwebtoken.verify(token, 'd14c698d0500ab4a6ee06a893dd351dd5d5b3c53cbd6692ed0d900d615bc5ec3');
  } catch (err) {
    return res.status(403).send({ message: 'Недостаточно прав. Необходима авторизация' });
  }
  req.user = payload;
  return next();
};

module.exports = auth;
