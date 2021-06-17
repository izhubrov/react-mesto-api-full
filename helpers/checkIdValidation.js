const objectID = require('mongoose').Types.ObjectId;
const sendError = require('./sendError');

const checkIdValidation = ({ res, id, errorText }) => {
  if (objectID.isValid(id)) return;
  const error = new Error('Not Valid');
  error.name = 'ValidationError';
  sendError({ error, res, errorText });
};

module.exports = checkIdValidation;
