import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';

//Чтобы осуществлялась перезагрузка страницы в gh-pages нужно вместо browserrouter поставить hashrouter и адрес будет с #
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.querySelector('.root')
);
