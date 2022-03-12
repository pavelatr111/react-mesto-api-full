
import '../blocks/page/page.css'
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import InfoTooltip from './InfoTooltip.js';
import React, { useEffect } from 'react';
import ImagePopup from './ImagePopup.js';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch } from 'react-router-dom';
import Register from './Register.js';
import Login from './Login.js';
import ProtectedRoute from './ProtectedRoute';
import { withRouter } from 'react-router'
import auth from '../utils/Auth';

function App(props) {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false)
  const [isSelectedCard, setIsSelectedCard] = React.useState({ name: '', link: '' });
  // стейт с данными о юзере
  const [currentUser, setCurrentUser] = React.useState({});
  //статус тултипа
  const [tooltipStatus, setTooltipStatus] = React.useState(false)

  const [cards, setCards] = React.useState([]);

  //стейт аутентификации
  const [loggedIn, setLoggedIn] = React.useState(false);

  //стейт мэйл
  const [userEmail ,setUserEmail] = React.useState('');
 

  function changiIsLoggedIn() {
    setLoggedIn(false)
  }



  React.useEffect(() => {
    if (loggedIn) {
    api.getCards()
      .then(data => {
        setCards(data)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }, [loggedIn])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(err)
      })

  }

  function handleCardDelete(card) {
    api.cardDelete(card._id).then(() => {

      setCards((cards) => cards.filter(x => x !== card))
    })
      .catch((err) => {
        console.log(err)
      })
  }
  // получаем данные о юзере 
  useEffect(() => {
    if (loggedIn) {
    api.getUserInfo()
      .then(data => {
        setCurrentUser(data)

      })
      .catch((err) => {
        console.log(err)
      })
    }
  }, [loggedIn])


  function handleEditAvatarClick() {
    // document.querySelector('.popup_avatar-edit').classList.add('popup_visible');
    setIsEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    // document.querySelector('.popup_profile').classList.add('popup_visible');
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    // document.querySelector('.popup_place').classList.add('popup_visible');
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(card) {
    setIsSelectedCard(card)
  }

  function handleTooltipOpen() {
    setIsTooltipOpen(true)
  }

  //обработчик сабмита формы
  function handleUpdateUser(user) {
    api.setUserInfo(user.name, user.about).then(data => {
      setCurrentUser(data)
      closeAllPopups()
    })
      .catch((err) => {
        console.log(err)
      })
    // .finally(() => {
    //   closeAllPopups()
    // })
  }
  // оброботчик  нового аватара 
  function handleUpdateAvatar(ava) {
    api.avatarEdit(ava.avatar)
      .then(data => {
        setCurrentUser(data)
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
    // .finally(() => {
    //   closeAllPopups()
    // })
  }

  function handleAddPlaceSubmit(data) {
    api.renderNewCard(data.name, data.link)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
    // .finally(() => {
    //   closeAllPopups()
    // })
  }


  //проверка токена

  const handleTokenCheck =() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setUserEmail(res.email);
            setLoggedIn(true);
            props.history.push('/')
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    handleTokenCheck();
  }, [ ]);

  function handleLogin() {
    setLoggedIn(true)
    handleTokenCheck()
  }


  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsTooltipOpen(false)
    setIsSelectedCard({ name: '', link: '' })
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <div className="page">
          <Header  
          changiLoggedIn={changiIsLoggedIn}
          userEmail={userEmail}
          />

          <ImagePopup card={isSelectedCard} onClose={closeAllPopups} />
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <InfoTooltip isOpen={isTooltipOpen} onClose={closeAllPopups} status={tooltipStatus}/>
          <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main}
              onCardClick={handleCardClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              card={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete} />

            <Route path="/sign-up">
              <Register 
                onTooltip={handleTooltipOpen}
                tooltipStatus={setTooltipStatus}
                close={closeAllPopups}
              />
            </Route>
            <Route path="/sign-in">
              <Login handleLogin={handleLogin} />
            </Route>
          </Switch>
          <Footer />
        </div>
      </>
    </CurrentUserContext.Provider>
  );

}

export default withRouter(App);
