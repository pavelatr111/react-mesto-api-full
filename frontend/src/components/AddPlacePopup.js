import React from "react"
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup(props) {
    const[url, setUrl] = React.useState('');
    const[place, setPlace] = React.useState('');

    function handleUrlChange(e) {
        setUrl(e.target.value);
      }
    function handlePlaceChange(e) {
        setPlace(e.target.value)
    } 

    React.useEffect(() => {
        setUrl('');
        setPlace('');
    }, [props.isOpen]);
    
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onAddPlace({
            link: url,
            name: place,
        });
    }
    
    return(
        <PopupWithForm
          name="place"
          title="Новое место"
          isOpen={props.isOpen}
          onClose={props.onClose}
          buttonText = "Создать"
          onSubmit={handleSubmit}
        >
          <label className="popup__lable-input">
            <input
            value={`${place}`}
              onChange={handlePlaceChange}
              type="text"
              className="popup__form-input popup__card-input popup__card-input_type_name"
              id="name-place"
              name="name"
              minLength="2"
              maxLength="30"
              required
              placeholder="Название"
            />
            <span className="error name-place-error"></span>
          </label>
          <label className="popup__lable-input">
            <input
              value={`${url}`}
              onChange={handleUrlChange}
              type="url"
              className="popup__form-input popup__card-input popup__card-input_type_link"
              id="link-place"
              name="link"
              required
              placeholder="Ссылка на картинку"
            />
            <span className="error link-place-error"></span>
          </label>
        </PopupWithForm>
    )
}
export default AddPlacePopup;