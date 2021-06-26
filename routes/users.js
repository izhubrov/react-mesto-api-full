const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  readUsers, readUserInfo, readCurrentUserInfo, setUserInfo, setUserAvatar,
} = require('../controllers/users');

router.get('/', readUsers);
router.get('/me', readCurrentUserInfo);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }).unknown(true),
}), readUserInfo);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), setUserInfo);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([\-a-zA-Z0-9\(\)@:%_\+\.~#?&\/=;,*'$!@\[\]]*)/)),
  }).unknown(true),
}), setUserAvatar);

module.exports = router;
