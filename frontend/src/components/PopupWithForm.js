import React from 'react';


function PopupWithForm(props) {
    return (
<div className={`popup popup_${props.name}  ${props.isOpen ? 'popup_visible' : " " }`} >
<div className="popup__container">
    <button className="popup__close" type="button" onClick={props.onClose}></button>
    <h2 className="popup__title">{props.title}</h2>
    <form className="popup__form" name={props.name} onSubmit= {props.onSubmit} noValidate>
        {props.children}
        <button type="submit" className="popup__button">
            {props.buttonText}
        </button> 
    </form>
</div>
</div>
    )
}

export default PopupWithForm;