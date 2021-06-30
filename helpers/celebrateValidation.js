const { celebrate, Joi } = require('celebrate');
const { urlRegExp, passwordRegExp } = require('../utils/utils');
const errorMessages = require('../utils/celebrateErrorMessages');

const celebrateValidation = (params) => {
  const res = {};

  const items = {
    email: Joi.string().email().required().messages(errorMessages.email),
    password: Joi.string().required().pattern(new RegExp(passwordRegExp))
      .messages(errorMessages.password),
    userId: Joi.string().hex().label('Пользователь').length(24)
      .messages(errorMessages.userId),
    name: Joi.string().min(2).max(30).messages(errorMessages.name),
    about: Joi.string().min(2).max(30).messages(errorMessages.about),
    avatar: Joi.string().pattern(new RegExp(urlRegExp)).messages(errorMessages.avatar),
    link: Joi.string().required().pattern(new RegExp(urlRegExp)).messages(errorMessages.link),
    cardId: Joi.string().hex().length(24).messages(errorMessages.cardId),
  };

  Object.keys(params).forEach((param) => {
    let innerObj = {};
    Object.keys(params[param]).forEach((item) => {
      innerObj[item] = items[item];
    });
    res[param] = Joi.object().keys(innerObj).unknown(true);
    innerObj = null;
  });

  return celebrate(res);
};

module.exports = celebrateValidation;
