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
          credentials: 'include',
                headers: this._headers,
                
            })
            .then(response)
    }
    //делаем запрос для получения данных пользователя
    getUserInfo(){
        return fetch(`${this._url}/users/me`, {
                credentials: 'include',
                headers: this._headers,
            })
          
            .then(response)
    }


    setUserInfo(name, about) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
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
        credentials: 'include',
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
        credentials: 'include',
        headers: {
          ...this._headers,
          'Content-Type': 'application/json'
        },
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
        credentials: 'include',
        headers: this._headers
      })
      .then(response)
    }

    changeLikeCardStatus(cardId, isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: `${isLiked? 'PUT' : 'DELETE'}`,
        credentials: 'include',
        headers: this._headers
      })
      .then(response)
    }

}

const api = new Api ({
  url: 'https://api.pavelpavlov.students.nomoredomains.work',
  headers: {
    "authorization": localStorage.jwt,
  }
})

// const api = new Api ({
//   url: 'http://localhost:3000',
//   headers() {
//    return {authorization: localStorage.jwt},
//   }
// })

export default api