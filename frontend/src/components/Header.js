/* eslint-disable react/prop-types */
import React from "react";
import { NavLink, useLocation } from 'react-router-dom';
import headerLogo from "../images/headerlogo.svg";


function Header({isLoggedIn, userEmail, onSignOut, isLoading}) {

  const location = useLocation();
  const isLocationSignIn = location.pathname === '/sign-in';
  const isLocationMain = location.pathname === '/';
  const [isColumnMenu, setColumnMenu] = React.useState(false);

  function handleLogOut() {
    onSignOut();
    setColumnMenu(false);
  }

  function handleSignIn() {
  }

  function handleMenuClick() {
    setColumnMenu(true);
  }

  function handleCloseMenu() {
    setColumnMenu(false);
  }

  return (
    <header className={`header ${!isColumnMenu ? "page__container" : ""} ${isColumnMenu ? "header_columned" : ""}`}>
      <div className={`header__logo-container ${isColumnMenu ? "header__logo-container_type_column" : ""}`}>
      <img
        className="header__logo appear"
        src={headerLogo}
        alt="Логотип сайта с надписью Место Россия английскими буквами"
      />
      <button onClick={handleCloseMenu} type="button" aria-label="Закрыть меню" className={`btn-close btn-close_place_header ${isColumnMenu ? "btn-close_active" : ""}`}></button>
      </div>
      <div onClick={handleMenuClick} className= {`header__btn-menu ${(!isLoggedIn || isColumnMenu) ? "header__btn-menu_type_inactive" : ""}`}>
        <div className="header__burger-line"></div>
        <div className="header__burger-line"></div>
        <div className="header__burger-line"></div>
      </div>
      { (!isLoading || isLocationMain) &&
      <nav className={`header__nav-container appear ${isLoggedIn && !isColumnMenu ? "header__nav-container_type_inactive" : ""} ${isColumnMenu ? "header__nav-container_type_column" : ""} `}>
        <p className="header__email">{isLoggedIn ? userEmail : ""}</p>
          {!isLocationSignIn ?
          <NavLink onClick={!isLoggedIn ? handleSignIn : handleLogOut} className={`header__nav-item ${isLocationMain ? "header__nav-item_active" : ""}`} to={"/sign-in"}>{isLoggedIn ? "Выйти" : "Войти"}</NavLink>
          :
          <NavLink className="header__nav-item" activeClassName="header_nav-item_active" to={"/sign-up"}>{!isLoggedIn ? "Регистрация" : ""}</NavLink>
          }
      </nav>
      }

    </header>
  );
}

export default Header;
