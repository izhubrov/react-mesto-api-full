const User = require('../models/user');
const sendError = require('../helpers/sendError');
const checkIdValidation = require('../helpers/checkIdValidation');

const readUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((error) => sendError({ error, res }));
};

const readUserInfo = (req, res) => {
  checkIdValidation({ res, id: req.params.userId, errorText: 'Переданы невалидные данные id пользователя' });
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => sendError({ error, res, errorNotFoundText: 'Запрашиваемый пользователь не найден' }));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((error) => sendError({ error, errorText: 'Переданы некорректные данные при создании пользователя', res }));
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
    .catch((error) => sendError({ error, errorText: 'Переданы некорректные данные при обновлении профиля', res }));
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
    .catch((error) => sendError({ error, errorText: 'Переданы некорректные данные при обновлении аватара пользователя', res }));
};

module.exports = {
  readUsers,
  readUserInfo,
  createUser,
  setUserInfo,
  setUserAvatar,
};
