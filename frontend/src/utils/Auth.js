


function response(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res}`);
}



class Auth {
    constructor({ url }) {
        this._url = url;
    }

    register(mail, password) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                email: mail

            })
        })
            .then(response)
    }

    login(mail, password) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: password,
                email: mail
            })
        }).then(response)
    }

    checkToken(jwt) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
        .then(response)
    }
}

const auth = new Auth({
    url: "https://api.pavelpavlov.students.nomoredomains.work",
})

export default auth

// export const register = async (email, password) => {
//   try {
//         const response = await fetch(`${ BASE_URL } / signup`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(email, password )
//         });
//         const res = await response.json();
//         return res;
//     } catch (err) {
//         return console.log(err);
//     }
// };

