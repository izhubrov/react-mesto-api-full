const errorMessages = {
  incorrectData: 'Переданы некорректные данные. ',
  password: {
    'string.pattern.base': 'Пароль должен содержать состоять из латинских букв, содержать как минимум 1 цифру, 1 спецсимвол, 1 прописную букву, 1 заглавную букву, длина от 6 символов.',
    'string.base': 'Пароль должен строкой',
    'string.empty': 'Пароль не может быть пустым полем',
    'any.required': 'Пароль является обязательным полем',
  },
  email: {
    'string.base': 'Почта должна быть строкой',
    'string.email': 'Почта не соответствует шаблону почты',
    'string.empty': 'Почта не может быть пустым полем',
    'any.required': 'Почта является обязательным полем',
  },
  userId: {
    'string.base': 'Код пользователя  должен быть строкой',
    'string.length': 'Код пользователя {#label} должен состоять из 24 символов',
    'string.hex': 'Код пользователя должен состоять из шестнадцатеричных символов',
  },
  name: {
    'string.base': 'Поле имени должно быть строкой',
    'string.min': 'Длина поля имени должна быть не менее 2 символов',
    'string.max': 'Длина поля имени должна быть не более 30 символов',
  },
  about: {
    'string.base': 'Поле о себе должно быть строкой',
    'string.min': 'Длина поля о себе должна быть не менее 2 символов',
    'string.max': 'Длина поля о себе должна быть не более 30 символов',
  },
  avatar: {
    'string.pattern.base': 'Ccылка на аватар не соответствует шаблону ссылки',
    'string.base': 'Ссылка должна быть строкой',
    'string.empty': 'Ссылка не может быть пустым полем',
  },
  link: {
    'string.pattern.base': 'Ccылка на изображение не соответствует шаблону ссылки',
    'string.base': 'Ссылка должна быть строкой',
    'string.empty': 'Ссылка не может быть пустым полем',
  },
  cardId: {
    'string.base': 'Код изображения должен быть строкой',
    'string.length': 'Код изображения должен состоять из 24 символов',
    'string.hex': 'Код изображения должен состоять из шестнадцатеричных символов',
  },
};

module.exports = errorMessages;
