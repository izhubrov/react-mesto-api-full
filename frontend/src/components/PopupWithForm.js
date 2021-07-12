/* eslint-disable react/prop-types */
import React from "react";

function PopupWithForm({
  title,
  name,
  buttonSubmitText,
  children,
  isOpen,
  onClose,
  onSubmit,
  buttonSubmitState,
}) {

  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container popup__container_form">
        <h2 className="title">{title}</h2>
        <button
          type="button"
          aria-label="Закрыть"
          className="btn-close btn-close_place_popup"
          onClick={onClose}
        ></button>
        <form
          className="form"
          name={`form-edit-${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
          type="submit"
          className={`form__btn-submit ${!buttonSubmitState ? "form__btn-submit_inactive" : ""}`}
          disabled={!buttonSubmitState ? true : ""}
          >
          {buttonSubmitText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
