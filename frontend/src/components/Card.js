/* eslint-disable react/prop-types */
import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import { notAvailableCardLink } from '../utils/utils';

function Card({ card, onCheckImage, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardButtonRemoveClassName = `cards__btn-remove ${isOwn ? 'cards__btn-remove_active': ''}`;

  const isLiked = card.likes.some((userWhoLiked)=>userWhoLiked._id === currentUser._id);
  const cardButtonLikeClassName = `cards__btn-like ${isLiked ? 'cards__btn-like_active appear': ''}`;
  const [cardLinkChecked, setCardLinkChecked] = React.useState(card.link);

  React.useEffect(()=>{
    onCheckImage(cardLinkChecked)
      .catch(()=> setCardLinkChecked(notAvailableCardLink));
  // eslint-disable-next-line
  },[]);
  

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="cards__item appear">
      <img
        className="cards__image"
        src={cardLinkChecked}
        alt={`Изображение ${card.name}`}
        onClick={handleClick}
      />
      <button
        type="button"
        aria-label="Удалить"
        className={cardButtonRemoveClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="cards__description">
        <h2 className="cards__title text-cut">{card.name}</h2>
        <div className="cards__likes-container">
          <button
            type="button"
            aria-label="Нравится"
            className={cardButtonLikeClassName}
            onClick={handleLikeClick}
          ></button>
          <div className="cards__likes-counter appear">{card.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
