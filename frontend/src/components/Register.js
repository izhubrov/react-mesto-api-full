/* eslint-disable react/prop-types */
import React from "react";
import AuthForm from "./AuthForm";

function Register({ onRegister }) {

  return (
    <AuthForm
      title="Регистрация"
      name="register"
      buttonSubmitText="Зарегистрироваться"
      onSubmit={onRegister}
    />
  );
}

export default Register;
