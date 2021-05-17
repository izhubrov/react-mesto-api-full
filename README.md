# Проект: Место на React
Данный проект представляет собой одностраничный сайт написанный с помощью JavaScript биботеки React с помощью [Create React App](https://github.com/facebook/create-react-app).

* Страница сайта расположена по адресу: https://izhubrov.github.io/mesto-react/.
* Собранный проект расположен по адресу: https://github.com/izhubrov/mesto-react.
* Применяемое API, сервер:  https://mesto.nomoreparties.co
___
## Макет сайта

Расположен в онлайн-сервисе для разработки интерфесов - графическом редакторе Figma по адресам:
* https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1
* https://www.figma.com/file/bjyvbKKJN2naO0ucURl2Z0/JavaScript.-Sprint-5?node-id=0%3A1
* https://www.figma.com/file/kRVLKwYG3d1HGLvh7JFWRT/JavaScript.-Sprint-6?node-id=0%3A1

___
## Как использовать

### Для начала
* Установите [Node.js](https://nodejs.org/en/download/)
* Установите [Git Bash для Windows OS](https://gitforwindows.org/)
* Склонируйте проект https://github.com/izhubrov/mesto-react.git

### Установка
* Установите необходимые зависимости из package.json

### Работа, запуск, деплой проекта из директории проекта
* Для локального запуска введите команду npm run start (Страница откроется по адресу [http://localhost:3000](http://localhost:3000) для просмотра в браузере).
* Для сборки проекта введите команду npm run build
* Для работы с gh-pages установите пакет gh-pages следующей командой npm install gh-pages --save-dev
* Для деплоя проекта введите команду npm run deploy

___
## Требования

### Требования к верстке
* Основным требованием при верстке сайта являлось его корректное отображение на различных разрешениях экрана с плавным появлением Popup форм редактирования профиля пользователя, добавления карточек через форму Popup и увеличением картинки.

### Требования к разработке на языке JavaScript 
* Должна быть реализована возможность удаления карточек, лайка и увеличения изображения через Popup.
* Должна быть реализована проверка на валидность полей ввода Popup с помощью встроенного API JavaScript.
* Должна быть реализована возможность закрытия Popup с помощью нажатия клавиши Escape и клика на фон.
* Должна быть реализована возможность создания новой карточки, редактирования профиля пользователя, проверка на валидность форм.

### Требования к сборке проекта
* Проект должен быть создан с помощью [Create React App](https://github.com/facebook/create-react-app).

___
## Применяемые технологии

### Применяемые технологии верстки
* Флекс-бокс верстка.
* Грид таблицы.
* Выразительные семантические теги (section, ul, footer).
* Позиционирование элементов (относительное, фиксированное, абсолютное, z-index).
* Относительные пути к файлам.
* Трансформация с плавностью перехода.
* Методология наименования классов CSS БЭМ Nested.
* Относительные размеры блоков.
* Вычисляемые значения (функция calc).
* Оптимизация шрифтов (сглаживание, подгонка размера текста, рендеринг).
* Метатег корректного масштабирования страницы (@media).
* Подключение локального шрифта Inter через директиву @font-face.

### Применяемые технологии программирования с импользованием библиотеки React
* Разметка страницы создается в JSX.
* Код разбит на функциональные компоненты.
* Используются хуки React.useState, React.useEffect, React.createRef, React.createContext.

### API
C помощью метода fetch и промисов (Promise).
* Осуществляется загрузка карточек с сервера, добавление и удаление карточек.
* Загружается и изменяются профиль и аватар пользователя с сервера.
* Загружаются и изменяются лайки пользователе.
___
## Итог

Сайт получился отзывчивым (резиновым и адаптивным), корректно отображается на устройствах с разрешением от 320px и есть возможность изменять данные сайта с проверкой на валидность.
Проект реализован на React и создан с помощью create-react-app.
Проект взаимодействует с сервером.

