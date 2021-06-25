const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const sendError = require('../helpers/sendError');
const checkIdValidation = require('../helpers/checkIdValidation');

const login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password).then((isMatched) => {
        if (!isMatched) {
          return Promise.reject(new Error('Неправильные почта или пароль'));
        }
        const token = jwt.sign({ _id: user._id }, 'd14c698d0500ab4a6ee06a893dd351dd5d5b3c53cbd6692ed0d900d615bc5ec3', { expiresIn: '7d' });
        return res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7 }).end();
      });
    })
    .catch((error) => res.status(401).send({ message: error.message }));
};

const readUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((error) => sendError({ error, res }));
};

const readUserInfo = (req, res) => {
  checkIdValidation({
    res,
    id: req.params.userId,
    errorText: 'Переданы невалидные данные id пользователя',
  });
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => sendError({ error, res, errorNotFoundText: 'Запрашиваемый пользователь не найден' }));
};

const readCurrentUserInfo = (req, res) => {
  const { user } = req;
  User.findById(user._id)
    .then((foundUser) => res.send(foundUser))
    .catch((error) => sendError({
      error,
      errorText: 'Текущий пользователь не найден',
      res,
    }));
};

const createUser = (req, res) => {
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
    .then((user) => res.send(user))
    .catch((error) => sendError({
      error,
      errorText: 'Переданы некорректные данные при создании пользователя',
      res,
    }));
};

const setUserInfo = (req, res) => {
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
    .orFail(new Error('Not Found'))
    .then((user) => res.send(user))
    .catch((error) => sendError({
      error,
      errorText: 'Переданы некорректные данные при обновлении профиля',
      res,
    }));
};

const setUserAvatar = (req, res) => {
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
    .orFail(new Error('Not Found'))
    .then((user) => res.send(user))
    .catch((error) => sendError({
      error,
      errorText:
          'Переданы некорректные данные при обновлении аватара пользователя',
      res,
    }));
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
