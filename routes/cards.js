const router = require('express').Router();
const {
  readCards, createCard, removeCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', readCards);
router.post('/', createCard);
router.delete('/:cardId', removeCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
