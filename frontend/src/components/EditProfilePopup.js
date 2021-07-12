/* eslint-disable react/prop-types */
import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import {useFormAndValidation} from "../utils/useFormAndValidation.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

  const {values,handleChange, errors, isValid, resetForm} = useFormAndValidation();

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    resetForm(currentUser);
    // eslint-disable-next-line
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({name: values.name, about: values.about})
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      buttonSubmitText={isLoading? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonSubmitState={isValid}
    >
      <fieldset className="form__set">
        <label className="form__field">
          <input
            type="text"
            name="name"
            value={values.name || ""}
            placeholder="Имя"
            className={`form__input ${errors.name ? 'form__input_type_error' : ''}`}
            required
            minLength="2"
            maxLength="40"
            onChange={handleChange}
          />
          <span className={`form__input-error ${errors.name ? 'form__input-error_active' : ''}`}>{errors.name}</span>
        </label>
        <label className="form__field">
          <input
            type="text"
            name="about"
            value={values.about || ""}
            placeholder="О себе"
            className={`form__input ${errors.about ? 'form__input_type_error' : ''}`}
            required
            minLength="2"
            maxLength="200"
            onChange={handleChange}
          />
          <span className={`form__input-error ${errors.about ? 'form__input-error_active' : ''}`}>{errors.about}</span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
