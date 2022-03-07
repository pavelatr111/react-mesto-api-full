import React from 'react';

function ImagePopup(props) {
    return (
    <>
    {props.card.link && (
      <div className= {`popup popup-image ${props.card ? 'popup_visible' : " " }`}>
        <div className="popup-image__container">
            <img className="popup-image__place" 
            src= {props.card.link}
            alt= {`${props.card.name}`}
            />
            <button className="popup__close" type="button" onClick={props.onClose}></button>
            <h2 className="popup-image__title">{props.card.name}</h2>
        </div>
      </div> 
    )}
    </>
    )
}

export default ImagePopup