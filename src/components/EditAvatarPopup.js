import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading }) {
  const [link, setLink] = React.useState('');
  const [isLinkInputValid, setLinkInputValid] = React.useState(true);
  const [linkValidationMessage, setLinkValidationMessage] = React.useState('');
  const [buttonSubmitState, setButtonSubmitState] = React.useState(false);
  const [isLinkInputInitial, setLinkInputInitial] = React.useState(true);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({avatar: link});
  }

  //Валидация формы
  function handleChange(evt) {
    setLink(evt.target.value);
    if (!evt.target.validity.valid) {
      setLinkInputInitial(false);
      setLinkInputValid(false);
      setLinkValidationMessage(evt.target.validationMessage);
    } else {
      setLinkInputInitial(false);
      setLinkInputValid(true);
    }
  }

  React.useEffect(() => {
    setLinkInputValid(true);
    setButtonSubmitState(false);
    setLinkInputInitial(true);
    setLink('');
  }, [isOpen]);

  React.useEffect(()=> {
    if (isLinkInputValid && !isLinkInputInitial) {
      setButtonSubmitState(true);
    } else {
      setButtonSubmitState(false);
    }
  }, [isLinkInputValid, isLinkInputInitial]);


  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      buttonSubmitText={isLoading? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonSubmitState={buttonSubmitState}
    >
      <fieldset className="form__set">
        <label className="form__field">
          <input
            value={link}
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            className={`form__input ${!isLinkInputValid ? 'form__input_type_error' : ''}`}
            required
            onChange={handleChange}
          />
          <span className={`form__input-error ${!isLinkInputValid ? 'form__input-error_active' : ''}`}>{linkValidationMessage}</span>
        </label>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
