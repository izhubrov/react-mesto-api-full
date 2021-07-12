/* eslint-disable react/prop-types */
import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function ConfirmDeletePopup({isOpen, onClose, card, onSubmitDelete, isLoading }) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmitDelete(card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="remove"
      buttonSubmitText={isLoading? "Удаление..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonSubmitState="true"
    />
  );
}

export default ConfirmDeletePopup;
