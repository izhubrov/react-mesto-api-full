const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const setIdMiddleware = require('./helpers/setIdMiddleware');
const sendError = require('./helpers/sendError');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(setIdMiddleware);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', (req, res) => sendError({ res, errorNotFoundText: 'Запрашиваемый ресурс не найден' }));

app.listen(PORT);
