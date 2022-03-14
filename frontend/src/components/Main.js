
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import Card from './Card.js';

function Main(props) {

    //подключаем контекст 
    const userContext = React.useContext(CurrentUserContext)

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__main">
                    <div className="profile__avatar-container">
                        <img className="profile__avatar" alt="жак ив кусто" src={userContext.avatar} />
                        <button className="profile__avatar-edit" type="button" aria-label="Обновить автарку" onClick={props.onEditAvatar} ></button>
                    </div>
                    <div className="profile__info">
                        <div className="profile__container">
                            <h1 className="profile__name">{userContext.name}</h1>
                            <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                        </div>
                        <p className="profile__job">{userContext.about}</p>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {props.card.map((card) => {
                    return (
                        <Card
                            card={card}
                            key={card._id}
                            onCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                        />
                    );
                })}
            </section>
        </main>
    )
}

export default Main




