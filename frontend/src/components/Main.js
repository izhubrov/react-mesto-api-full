/* eslint-disable react/prop-types */
import React from "react";
import "../index.css";
import Card from "./Card.js";
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCheckImage, cards, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile page__container">
        <div
          className="profile__avatar appear"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
          onClick={onEditAvatar}
        ></div>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name appear text-cut">{currentUser.name}</h1>
            <button type="button" aria-label="Редактировать" className="profile__btn-edit" onClick={onEditProfile}></button>
          </div>
          <p className="profile__about appear text-cut">{currentUser.about}</p>
        </div>
        <button type="button" aria-label="Добавить" className="profile__btn-add" onClick={onAddPlace}> </button>
      </section>

      <section className="places page__container">
        <ul className="cards">
          {cards.map((card) => {
            return (
              <Card key={card._id} card={card} onCheckImage = {onCheckImage} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
