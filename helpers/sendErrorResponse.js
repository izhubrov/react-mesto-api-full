const sendError = (error, errorText, res) => {
  if (['CastError', 'Not Found'].includes(error.name)) {
    return res.status(404).send({ message: errorText });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).send({ message: errorText });
  }

  return res.status(500).send({ message: 'Ошибка на стороне сервера' });
};

module.exports = sendError;
