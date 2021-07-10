const allowedCors = [
  'https://izhubrov-mesto.nomoredomains.club',
  'https://izhubrov.github.io',
  'http://localhost:3000',
];

const cors = (req, res, next) => {
  const { method, headers } = req;
  // ВЫНЕСТИ ПЕРЕМЕННУЮ В ENV!!!
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,POST,PUT,PATCH,DELETE';
  const requestHeaders = headers['access-control-request-headers'];
  const { origin } = headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
  }
  res.status(200);
  next();
};

module.exports = cors;
