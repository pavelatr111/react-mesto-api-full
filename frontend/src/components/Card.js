import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';



function Card(props) {
  //подписываемся на контекст 
  const userContext = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === userContext._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__trash ${isOwn ? 'element__trash_visible' : 'element__trash_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === userContext._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ' '}`;

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card)
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }  


  return (
    <div className="element">
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}></button>
      <img
        className="element__img"
        onClick={handleClick}
        src={props.card.link}
        alt={props.card.name}
      />
      <div className="element__group">
        <h3 className="element__text">{props.card.name}</h3>
        <div className="element__like-counter">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <p className="element__like-number">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card