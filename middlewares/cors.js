const allowedCors = [
  'https://izhubrov-mesto.nomoreparties.club',
  'https://izhubrov.github.io',
];

const cors = (req, res, next) => {
  const { method, headers } = req;
  // ВЫНЕСТИ ПЕРЕМЕННУЮ В ENV!!!
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,POST,PUT,PATCH,DELETE';
  const requestHeaders = headers['Access-Control-Request-Headers'];
  const { origin } = headers;

  if (method === 'OPTIONS' && allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // res.headers('Access-Control-Allow-Origin', origin);
  }

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
};

module.exports = cors;
