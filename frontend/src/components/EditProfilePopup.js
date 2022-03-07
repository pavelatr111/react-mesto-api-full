import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm"

function EditProfilePopup (props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    const currentContext = React.useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentContext.name);
        setDescription(currentContext.about);
    }, [currentContext, props.isOpen]); 

    function handleNameChange(e) {
        setName(e.target.value);
      }
    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    } 
    
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <>
        <PopupWithForm
          name="profile"
          title="Редактировать профиль"
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
          buttonText = "Сохранить"
        >
          <label className="popup__lable-input">
            <input
              type="text"
              value={`${name}`}
              onChange={handleNameChange}
              className="popup__form-input popup__form-input_type_name"
              name="name"
              id="name-profile"
              minLength="2"
              maxLength="40"
              required
              placeholder="введите имя"
            />
            <span className="error name-profile-error"></span>
          </label>
          <label className="popup__lable-input">
            <input
              type="text"
              value={`${description}`} 
              onChange={handleDescriptionChange}
              className="popup__form-input popup__form-input_type_job"
              name="job"
              id="job-profile"
              minLength="2"
              maxLength="200"
              required
              placeholder="введите проффесию"
            />
            <span className="error job-profile-error"></span>
          </label>
        </PopupWithForm>
        </>
    )
}

export default EditProfilePopup