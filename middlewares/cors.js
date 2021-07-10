const allowedCors = [
  'https://izhubrov-mesto.nomoredomains.club',
  'http://izhubrov-mesto.nomoredomains.club',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;
  // ВЫНЕСТИ ПЕРЕМЕННУЮ В ENV!!!

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.status(200);
  }

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,POST,PUT,PATCH,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.status(200);
  }

  next();
};

module.exports = cors;
