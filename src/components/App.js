import React from "react";
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import "../index.css";
import Header from "./Header.js";
import Login from "./Login.js";
import Register from "./Register.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ConfirmDeletePopup from "./ConfirmDeletePopup.js";
import ImagePopup from "./ImagePopup.js";
import ErrorPopup from "./ErrorPopup.js";
import InfoToolTip from "./InfoToolTip";
import api from "../utils/api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import ProtectedRoute from "./ProtectedRoute.js";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = React.useState(
    false
  );

  const [isInfoToolTipPopupOpen, setInfoToolTipPopupOpen] = React.useState(
    false
  );
  const [isSuccessInfoToolTip, setIsSuccessInfoToolTip] = React.useState(true);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [error, setError] = React.useState({ errorText: "", isActive: false });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [submitTextProfilePopup, setSubmitTextProfilePopup] = React.useState(
    "Сохранить"
  );
  const [submitTextAvatarPopup, setSubmitTextAvatarPopup] = React.useState(
    "Сохранить"
  );
  const [submitTextAddPlacePopup, setSubmitTextAddPlacePopup] = React.useState(
    "Сохранить"
  );
  const [
    submitTextConfirmDeletePopup,
    setSubmitTextConfirmDeletePopup,
  ] = React.useState("Да");
  const [cardToRemove, setCardToRemove] = React.useState({});

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    setIsLoggedIn(false);
  }, []);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => {
        setErrorPopup(err, true);
        setTimeout(() => setErrorPopup(err, false), 5000);
      });
  }, []);

  function handleUpdateUser(user) {
    setSubmitTextProfilePopup("Сохранение...");
    api
      .setUserInfo(user)
      .then((updatedUser) => {
        setCurrentUser({
          ...currentUser,
          name: updatedUser.name,
          about: updatedUser.about,
        });
        closeAllPopups();
      })
      .catch((err) => {
        setErrorPopup(err, true);
        setTimeout(() => setErrorPopup(err, false), 5000);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    checkImage(avatar)
      .then(() => {
        setSubmitTextAvatarPopup("Сохранение...");
        api.changeAvatar(avatar).then((updatedUser) => {
          setCurrentUser({ ...currentUser, avatar: updatedUser.avatar });
          closeAllPopups();
        });
      })
      .catch(() => {
        setErrorPopup("Ошибка адреса", true);
        setTimeout(() => setErrorPopup("Ошибка адреса", false), 5000);
      });
  }

  function checkImage(link) {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      img.src = link;
      img.onload = resolve;
      img.onerror = reject;
      img.remove();
    });
  }

  function handleAddCard(card) {
    checkImage(card.link)
      .then(() => {
        setSubmitTextAddPlacePopup("Добавление...");
        api.postCard(card).then((newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups();
        });
      })
      .catch(() => {
        setErrorPopup("Ошибка адреса", true);
        setTimeout(() => setErrorPopup("Ошибка адреса", false), 5000);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(
      (userWhoLiked) => userWhoLiked._id === currentUser._id
    );
    api
      .changeLikeCardStatus(card, !isLiked)
      .then((cardWithChangedLike) => {
        setCards(
          cards.map((cardFromState) =>
            cardFromState._id === card._id ? cardWithChangedLike : cardFromState
          )
        );
      })
      .catch((err) => {
        setErrorPopup(err, true);
        setTimeout(() => setErrorPopup(err, false), 5000);
      });
  }

  function handleCardDelete(card) {
    setSubmitTextConfirmDeletePopup("Удаление...");
    api
      .deleteCard(card)
      .then(() => {
        setCards(
          cards.filter((cardFromState) => cardFromState._id !== card._id)
        );
        closeAllPopups();
      })
      .catch((err) => {
        setErrorPopup(err, true);
        setTimeout(() => setErrorPopup(err, false), 5000);
      });
  }

  function handleEditAvatarClick() {
    setSubmitTextAvatarPopup("Сохранить");
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setSubmitTextProfilePopup("Сохранить");
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setSubmitTextAddPlacePopup("Добавить");
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function confirmCardDelete(card) {
    setSubmitTextConfirmDeletePopup("Да");
    setCardToRemove(card);
    setConfirmDeletePopupOpen(true);
  }

  function closeInfoToolTipPopup() {
    closeAllPopups();
    if (isSuccessInfoToolTip) {
      console.log(123);
      setIsLoggedIn(true);
      history.push("/");
    }
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setConfirmDeletePopupOpen(false);
    setInfoToolTipPopupOpen(false);
    setSelectedCard({});
    setCardToRemove({});
  }

  function setErrorPopup(err, active) {
    setError({ ...error, errorText: err, isActive: active });
  }

  React.useEffect(() => {
    function handleOverlayClick(evt) {
      if (
        evt.target.classList.contains("popup") &&
        !evt.target.classList.contains("popup_type_auth")
      ) {
        if (isSuccessInfoToolTip) {
          closeInfoToolTipPopup();
        } else {
          closeAllPopups();
        }
      }
    }
    document.addEventListener("mousedown", handleOverlayClick);

    return () => {
      document.removeEventListener("mousedown", handleOverlayClick);
    };
  }, []);

  React.useEffect(() => {
    function handleEscapeClick(evt) {
      if (
        (evt.key === "Escape" &&
          evt.target.classList.contains("popup__btn-submit_type_auth")) ||
        (evt.key === "Escape" &&
          location.pathname !== "/sign-up" &&
          location.pathname !== "/sign-in")
      ) {
        if (isSuccessInfoToolTip) {
          closeInfoToolTipPopup();
        } else {
          closeAllPopups();
        }
      }
    }
    document.addEventListener("keyup", handleEscapeClick);

    return () => {
      document.removeEventListener("keyup", handleEscapeClick);
    };
  }, []);

  function handleLogin() {
    setIsLoggedIn(true);
    history.push("/");
  }

  function handleRegister() {
    // setIsLoggedIn(true);
    setIsSuccessInfoToolTip(true);
    setInfoToolTipPopupOpen(true);
    // history.push('/sign-in');
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    history.push("/sign-in");
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header isLoggedIn={isLoggedIn} onSignOut={handleSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            isLoggedIn={isLoggedIn}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={confirmCardDelete}
          />

          <Route path="/sign-up">
            <Register
              isOpen={true}
              onRegister={handleRegister}
              buttonSubmitText={"Зарегистрироваться"}
            />
          </Route>
          <Route path="/sign-in">
            <Login
              isOpen={true}
              onLogin={handleLogin}
              buttonSubmitText={"Войти"}
            />
          </Route>

          <Route>
            <Redirect to={!isLoggedIn ? "/sign-in" : "/"} />
          </Route>
        </Switch>

        <Footer isLoggedIn={isLoggedIn} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonSubmitText={submitTextProfilePopup}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonSubmitText={submitTextAvatarPopup}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddCard}
          buttonSubmitText={submitTextAddPlacePopup}
        />

        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          card={cardToRemove}
          onClose={closeAllPopups}
          onSubmitDelete={handleCardDelete}
          buttonSubmitText={submitTextConfirmDeletePopup}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <ErrorPopup errorText={error.errorText} isActive={error.isActive} />

        <InfoToolTip
          isOpen={isInfoToolTipPopupOpen}
          onClose={closeInfoToolTipPopup}
          isSuccess={isSuccessInfoToolTip}
          isToolTipForm={true}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
