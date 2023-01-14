class AuthApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponse(url, fetchOptions) {
    return fetch(this._baseUrl + url, fetchOptions)
      .then (res => {
        if (res.ok) {
          return res.json();
        }
        return res.json()
          .then (res => Promise.reject(res));
      })
  }

  register({ name, email, password }) {
    return this._getResponse('signup', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, email, password })
    })
  }

  authorize({ password, email }) {
    return this._getResponse('signin', {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({ password, email })
    })
  }

  signOut() {
    return this._getResponse('signout', {
      method: 'POST',
      headers: this._headers,
      credentials: 'include'
    })
  }

  checkToken() {
    return this._getResponse('users/me', {
      headers: this._headers,
      credentials: 'include'
    })
  }
}

const authApi = new AuthApi({
  baseUrl: 'https://api.movies.pawnchow.nomoredomains.club/',
  headers: {
    'Content-type': 'application/json',
  }
})

export default authApi;
