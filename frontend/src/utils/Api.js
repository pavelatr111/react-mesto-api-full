function response(res){
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res}`);
}
 

class Api {
    constructor({url, headers}) {
      
        this._url = url;
        this._headers = headers;
    }
    //делаем запрос на сервер для получения карточек
    getCards(){
        return fetch(`${this._url}/cards`, {
                headers: this._headers,
            })
            .then(response)
    }
    //делаем запрос для получения данных пользователя
    getUserInfo(){
        return fetch(`${this._url}/users/me`, {
                headers: this._headers,
            })
          
            .then(response)
    }


    setUserInfo(name, about) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: {
            ...this._headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
      })
      .then(response)
    }

    avatarEdit(avatar) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          ...this._headers,
          'Content-Type': 'application/json'
      },
        body: JSON.stringify({
          avatar
        })
      })
      .then(response)
    }
    
    renderNewCard(name, link) {
      return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: {
          ...this._headers,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          name,
          link
        })
      })
      .then(response)
    }
    
    cardDelete(cardId) {
      return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(response)
    }

    changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: `${isLiked? 'PUT' : 'DELETE'}`,
        headers: this._headers
      })
      .then(response)
    }

}

const api = new Api ({
  url: 'https://api.pavelpavlov.students.nomoredomains.work',
  headers: {
    authorization: '61544c3a-773f-4208-9b8d-c1a194add288'
  }
})

export default api 