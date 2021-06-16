const Card = require('../models/card');
const sendError = require('../helpers/sendError');
const checkIdValidation = require('../helpers/checkIdValidation');

const readCards = (req, res) => {
  Card.find({})
    .populate(['likes', 'owner'])
    .then((cards) => res.send(cards))
    .catch((error) => sendError({ error, errorText: 'Ошибка на стороне сервера', res }));
};

const createCard = async (req, res) => {
  const { name, link } = req.body;
  try {
    const newCard = await Card.create({ name, link, owner: req.user._id });
    newCard.populate('owner').execPopulate()
      .then((card) => res.send(card));
  } catch (error) {
    sendError({ error, errorText: 'Переданы некорректные данные при создании карточки', res });
  }
};

const removeCard = (req, res) => {
  checkIdValidation({ res, id: req.params.cardId, errorText: 'Переданы невалидные данные id карточки' });
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then(() => res.send({ message: 'Пост удалён' }))
    .catch((error) => sendError({ error, res, errorNotFoundText: 'Запрашиваемая карточка не найдена' }));
};

const likeCard = (req, res) => {
  checkIdValidation({ res, id: req.params.cardId, errorText: 'Переданы невалидные данные id карточки' });
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['likes', 'owner'])
    .then((card) => res.send(card))
    .catch((error) => sendError({ error, res, errorNotFoundText: 'Запрашиваемая карточка не найдена' }));
};

const dislikeCard = (req, res) => {
  checkIdValidation({ res, id: req.params.cardId, errorText: 'Переданы невалидные данные id карточки' });
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['likes', 'owner'])
    .then((card) => res.send(card))
    .catch((error) => sendError({ error, res, errorNotFoundText: 'Запрашиваемая карточка не найдена' }));
};

module.exports = {
  readCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard,
};
