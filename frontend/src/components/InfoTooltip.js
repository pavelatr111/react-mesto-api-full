import React from 'react'
import successful from '../images/successful.svg'
import unSuccessful from '../images/unsuccessfullReg.svg'

function InfoTooltip(props) {
    return (
        <div className={`tooltip ${props.isOpen ? 'popup_visible' : " " }`}>
            <div className="tooltip__container">
                <button className="tooltip__close" type="button" onClick={props.onClose}></button>
                <img className="tooltip__img"  src={`${props.status ? successful : unSuccessful } `} alt="успешная регистрация"/>
                <p className="tooltip__title">{`${props.status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}`}</p>
            </div>
        </div>
    )
}

export default InfoTooltip