const { celebrate, Joi } = require('celebrate');
const { urlRegExp } = require('../utils');

const celebrateValidation = (params) => {
  const res = {};

  const items = {
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
    userId: Joi.string().alphanum().length(24),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(new RegExp(urlRegExp)),
    link: Joi.string().required().pattern(new RegExp(urlRegExp)),
    cardId: Joi.string().alphanum().length(24),
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
