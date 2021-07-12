/* eslint-disable react/prop-types */
import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import {useFormAndValidation} from "../utils/useFormAndValidation.js";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading }) {
  
  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();

  React.useEffect(() => {
    resetForm({link:''});
    // eslint-disable-next-line
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({avatar: values.link});
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonSubmitText={isLoading? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonSubmitState={isValid}
    >
      <fieldset className="form__set">
        <label className="form__field">
          <input
            type="url"
            name="link"
            value={values.link || ""}
            placeholder="Ссылка на картинку"
            className={`form__input ${errors.link ? 'form__input_type_error' : ''}`}
            required
            onChange={handleChange}
          />
          <span className={`form__input-error ${errors.link ? 'form__input-error_active' : ''}`}>{errors.link}</span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
