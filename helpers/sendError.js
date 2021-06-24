const sendError = ({
  error, errorText = 'Ошибка на стороне сервера', res, errorNotFoundText = '',
}) => {
  console.log(error.message);
  if (errorNotFoundText) {
    const ERROR_CODE = 404;
    return res.status(ERROR_CODE).send({ message: errorNotFoundText });
  }
  if (['CastError', 'ValidationError'].includes(error.name)) {
    const ERROR_CODE = 400;
    return res.status(ERROR_CODE).send({ message: errorText });
  }
  const ERROR_CODE = 500;
  return res.status(ERROR_CODE).send({ message: errorText });
};

module.exports = sendError;
