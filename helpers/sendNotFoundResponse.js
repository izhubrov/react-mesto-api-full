const sendErrorResponse = require('./sendErrorResponse');

const sendNotFoundResponse = (req, res) => {
  const error = new Error('Not Found');
  error.name = 'Not Found';
  sendErrorResponse(error, 'Запрашиваемый ресурс не найден', res);
};

module.exports = sendNotFoundResponse;
