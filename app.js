const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { isCelebrateError } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const ValidationError = require('./errors/validation-err');
const { mongoUrl, mongoSettings } = require('./utils');
const celebrateValidation = require('./helpers/celebrateValidation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(mongoUrl, mongoSettings);

app.use(helmet());
app.use(cors);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);

app.post('/signin', celebrateValidation({ body: { email: null, password: null } }), login);
app.post('/signup', celebrateValidation({ body: { email: null, password: null } }), createUser);
app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);
app.use('*', (req, res, next) => {
  const error = new NotFoundError('Запрашиваемый ресурс не найден');
  next(error);
});

app.use(errorLogger);

app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    const error = new ValidationError('Переданы некорректные данные');
    next(error);
  }
  next(err);
});

app.use((err, req, res, next) => {
  const { code = 500, message, name } = err;
  if (name === 'MongoError' && code === 11000) {
    return res.status(409).send({ message: 'Пользователь с такой почтой уже существует' });
  }
  res.status(code).send({ message: code === 500 ? 'Ошибка на стороне сервера' : message });
  return next();
});

app.listen(PORT);
