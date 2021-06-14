const User = require('../models/user');
const sendErrorResponse = require('../helpers/sendErrorResponse');

const readUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((error) => sendErrorResponse(error, 'Ошибка на стороне сервера', res));
};

const readUserInfo = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch((error) => sendErrorResponse(error, 'Запрашиваемый пользователь не найден', res));
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((error) => sendErrorResponse(error, 'Переданы некорректные данные при создании пользователя', res));
};

const setUserInfo = (req, res) => {
  const { name: newName, about: newAbout } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name: newName, about: newAbout },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.send(user))
    .catch((error) => sendErrorResponse(error, 'Переданы некорректные данные при обновлении профиля', res));
};

const setUserAvatar = (req, res) => {
  const { avatar: newAvatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: newAvatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.send(user))
    .catch((error) => sendErrorResponse(error, 'Переданы некорректные данные при обновлении аватара пользователя', res));
};

module.exports = {
  readUsers,
  readUserInfo,
  createUser,
  setUserInfo,
  setUserAvatar,
};
