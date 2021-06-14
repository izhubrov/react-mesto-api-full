const Card = require('../models/card');
const sendErrorResponse = require('../helpers/sendErrorResponse');

const readCards = (req, res) => {
  Card.find({})
    .populate(['likes', 'owner'])
    .then((cards) => res.send(cards))
    .catch((error) => sendErrorResponse(error, 'Ошибка на стороне сервера', res));
};

const createCard = async (req, res) => {
  const { name, link } = req.body;
  try {
    const newCard = await Card.create({ name, link, owner: req.user._id });
    newCard.populate('owner').execPopulate()
      .then((card) => res.send(card));
  } catch (error) {
    sendErrorResponse(error, 'Переданы некорректные данные при создании карточки', res);
  }
};

const removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(() => res.send({ message: 'Пост удалён' }))
    .catch((error) => sendErrorResponse(error, 'Запрашиваемая карточка не найдена', res));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['likes', 'owner'])
    .then((card) => res.send(card))
    .catch((error) => sendErrorResponse(error, 'Запрашиваемая карточка не найдена', res));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['likes', 'owner'])
    .then((card) => res.send(card))
    .catch((error) => sendErrorResponse(error, 'Запрашиваемая карточка не найдена', res));
};

module.exports = {
  readCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard,
};
