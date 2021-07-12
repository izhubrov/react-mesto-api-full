/* eslint-disable react/prop-types */
import React from 'react';
import { notAvailableCardLink } from '../utils/utils';


function ImagePopup({ card, onCheckImage, onClose }) {

  const [cardLink, setCardLinkChecked] = React.useState(card.link);

  React.useEffect(()=>{
    setCardLinkChecked(card.link);
    onCheckImage(card.link)
      .catch(()=> setCardLinkChecked(notAvailableCardLink));
  // eslint-disable-next-line
  },[card]);

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
          <img className="popup__image" src={cardLink} alt={`Изображение ${card.name}`} />
          <figcaption className="popup__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
