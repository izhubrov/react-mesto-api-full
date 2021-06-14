const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const setIdMiddleware = require('./helpers/setIdMiddleware');
const sendNotFoundResponse = require('./helpers/sendNotFoundResponse');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(setIdMiddleware);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use('*', sendNotFoundResponse);

app.listen(PORT);
