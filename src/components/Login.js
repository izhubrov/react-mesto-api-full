/* eslint-disable react/prop-types */
import React from "react";
import AuthForm from "./AuthForm";
import CssLoader from "./CssLoader.js";

function Login({ onLogin, isLoading }) {

  return (
    <>
    <CssLoader isLoading={isLoading} />
    {!isLoading && 
    <AuthForm
      title="Вход"
      name="login"
      buttonSubmitText="Войти"
      onSubmit={onLogin}
    />
    }
    </>
  );
}

export default Login;
