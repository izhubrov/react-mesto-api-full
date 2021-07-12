/* eslint-disable react/prop-types */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {useFormAndValidation} from "../utils/useFormAndValidation.js";


function AuthForm({
  title,
  name,
  buttonSubmitText,
  onSubmit,
}) {
  const location = useLocation();
  const isLocationSignUp = location.pathname === "/sign-up";
  const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation();

  React.useEffect(() => {
    resetForm();
    // eslint-disable-next-line
  }, []);

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit({email: values.email, password: values.password})
  }

  return (
    <div className="auth page__container appear">
        <h2 className="title title_place_auth">{title}</h2>

        <form
          className="form"
          name={`form-edit-${name}`}
          onSubmit={handleSubmit}
          noValidate
        >
        <fieldset className="form__set">
        <label className="form__field">
          <input
            type="email"
            name="email"
            value={values.email || ""}
            placeholder="Email"
            className={`form__input form__input_type_auth ${errors.email ? 'form__input_type_error' : ''}`}
            required
            minLength="2"
            maxLength="40"
            onChange={handleChange}
          />
          <span className={`form__input-error ${errors.email ? 'form__input-error_active' : ''}`}>{errors.email}</span>
        </label>
        <label className="form__field">
          <input
            type="password"
            name="password"
            value={values.password || ""}
            placeholder="Пароль"
            className={`form__input form__input_type_auth ${errors.password ? 'form__input_type_error' : ''}`}
            required
            minLength="8"
            maxLength="40"
            onChange={handleChange}
          />
          <span className={`form__input-error ${errors.password ? 'form__input-error_active' : ''}`}>{errors.password}</span>
        </label>
      </fieldset>
          
          {
            <button
            type="submit"
            className={`form__btn-submit form__btn-submit_type_auth ${!isValid ? "form__btn-submit_inactive" : ""}`}
            disabled={!isValid ? true : ""}
            >
            {buttonSubmitText}
          </button>
          }
          {isLocationSignUp && (
            <div className="form__auth-container">
              <p className="form__auth-text">Уже зарегистрированы?&nbsp;</p>
              <Link className="form__auth-link" to={"/sign-in"}>Войти</Link>
            </div>
          )}
        </form>
    </div>
  );
}

export default AuthForm;
