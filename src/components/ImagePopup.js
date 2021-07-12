/* eslint-disable react/prop-types */
import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_img ${
        card.link ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          type="button"
          aria-label="Закрыть"
          className="btn-close btn-close_place_popup"
          onClick={onClose}
        ></button>
        <figure className="popup__figure">
          <img className="popup__image" src={`${card.link}`} alt={`Изображение ${card.name}`} />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
