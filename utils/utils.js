const mongoSettings = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const mongoUrl = 'mongodb://localhost:27017/mestodb';

const randomString = 'd14c698d0500ab4a6ee06a893dd351dd5d5b3c53cbd6692ed0d900d615bc5ec3';

const urlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([\-a-zA-Z0-9\(\)@:%_\+\.~#?&\/=;,*'$!@\[\]]*)/;
const passwordRegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

module.exports = {
  mongoSettings,
  mongoUrl,
  randomString,
  urlRegExp,
  passwordRegExp,
};
