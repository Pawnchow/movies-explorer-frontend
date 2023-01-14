class MainApi {
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

  getUserInfo() {
    return this._getResponse('users/me', {
      headers: this._headers,
      credentials: 'include',
    })
  }

  setUserInfo(name, email) {
    return this._getResponse('users/me', {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: name,
        email: email,
        })
    })
  }

  getSavedMovies() {
    return this._getResponse('movies', {
      headers: this._headers,
      credentials: 'include',
    })
  }

  saveMovie(movieData) {
    return this._getResponse('movies', {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        country: movieData.country,
        director: movieData.director,
        duration: movieData.duration,
        year: movieData.year,
        description: movieData.description,
        image: 'https://api.nomoreparties.co/' + movieData.image.url,
        trailerLink: movieData.trailerLink,
        thumbnail: 'https://api.nomoreparties.co/' + movieData.image.formats.thumbnail.url,
        movieId: movieData.id,
        nameRU: movieData.nameRU,
        nameEN: movieData.nameEN,
      }),
    })
  }

  deleteMovie(movieId) {
    return this._getResponse('movies/' + movieId, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include'
    })
  }
}

const mainApi = new MainApi ({
  baseUrl: 'https://api.movies.pawnchow.nomoredomains.club/',
  headers: {
    'Content-type': 'application/json',
  }
});

export default mainApi;
