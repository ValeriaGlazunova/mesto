class Api {
    constructor({ baseUrl, headers }) {
        this._headers = headers
        this._baseUrl = baseUrl
    }

getProfile() {
    fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
    })
    .then(res => {
        console.log('res', res)
    })
}

getInitialCards() {

}

}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39/',
    headers: {
        authorization: '58580c49-bd30-4ffb-99a1-bd90d64f0dc5',
        'Content-Type': 'application/json'
    }
});