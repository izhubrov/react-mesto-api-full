const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const UnauthorizedError = require('../errors/unauthorized-err');
const NotFoundError = require('../errors/not-found-err');

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password).then((isMatched) => {
        if (!isMatched) {
          throw new UnauthorizedError('Неправильные почта или пароль');
        }
        const token = jwt.sign({ _id: user._id }, 'd14c698d0500ab4a6ee06a893dd351dd5d5b3c53cbd6692ed0d900d615bc5ec3', { expiresIn: '7d' });
        return res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7 }).end();
      });
    })
    .catch(next);
};

const readUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const readUserInfo = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.send(user);
    })
    .catch(next);
};

const readCurrentUserInfo = (req, res, next) => {
  const { user } = req;
  User.findById(user._id)
    .then((foundUser) => {
      if (!foundUser) {
        throw new NotFoundError('Текущий пользователь не найден');
      }
      res.send(foundUser);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      res.send({
        name: user.name, about: user.about, avatar: user.avatar, email: user.email,
      });
    })
    .catch(next);
};

const setUserInfo = (req, res, next) => {
  const { name: newName, about: newAbout } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name: newName, about: newAbout },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Текущий пользователь не найден');
      }
      res.send(user);
    })
    .catch(next);
};

const setUserAvatar = (req, res, next) => {
  const { avatar: newAvatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: newAvatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Текущий пользователь не найден');
      }
      res.send(user);
    })
    .catch(next);
};

module.exports = {
  login,
  readUsers,
  readUserInfo,
  readCurrentUserInfo,
  createUser,
  setUserInfo,
  setUserAvatar,
};
