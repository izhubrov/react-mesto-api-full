const sendError = (error, errorText, res) => {
  if (['CastError', 'Not Found'].includes(error.name)) {
    const ERROR_CODE = 404;
    return res.status(ERROR_CODE).send({ message: errorText });
  }
  if (error.name === 'ValidationError') {
    const ERROR_CODE = 400;
    return res.status(ERROR_CODE).send({ message: errorText });
  }
  const ERROR_CODE = 500;
  return res.status(ERROR_CODE).send({ message: 'Ошибка на стороне сервера' });
};

module.exports = sendError;
