import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup (props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatarRef.current.value
        });
      }

   return (
   <PopupWithForm
          name="avatar-edit"
          title="Обновить аватар"
          isOpen={props.isOpen}
          onClose={props.onClose}
          buttonText = "Сохранить"
          onSubmit = {handleSubmit}
        >
          <label className="popup__lable-input">
            <input
              ref = {avatarRef}
              type="url"
              className="popup__form-input popup__form-input_type_avatar-edit"
              id="link-avatar-edit"
              name="avatar"
              required
              placeholder="https://somewebsite.com/someimage.jpg"
            />
            <span className="error link-avatar-edit-error"></span>
          </label>
    </PopupWithForm>
    )
}

export default EditAvatarPopup