const allowedCors = [
  'https://izhubrov-mesto.nomoreparties.club',
];

const cors = (req, res, next) => {
  const { method, headers } = req;
  // ВЫНЕСТИ ПЕРЕМЕННУЮ В ENV!!!
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,POST,PUT,PATCH,DELETE';
  const requestHeaders = headers['Access-Control-Request-Headers'];
  const { origin } = headers;

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
  }

  if (allowedCors.includes(origin)) {
    res.headers('Access-Control-Allow-Origin', origin);
  }

  next();
};

module.exports = cors;
