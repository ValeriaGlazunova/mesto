class Api {
    constructor({ baseUrl, headers }) {
        this._headers = headers
        this._baseUrl = baseUrl
    }

getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
    
}

getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
}

editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
    body: JSON.stringify({
    name,
    about
    })
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)
}

postCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
    body: JSON.stringify({
    name,
    link
    })
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)

}

deleteMyCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers,
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)

}

deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers,
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)

}

putLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers,
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)

}

changeAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            avatar
            })
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.status))
    .catch(console.log)

}

}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
    headers: {
        authorization: '58580c49-bd30-4ffb-99a1-bd90d64f0dc5',
        'Content-Type': 'application/json'
    }
});