class MoviesApi {
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

  getMovies() {
    return this._getResponse('', this._headers)
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-type': 'application/json',
  }
});

export default moviesApi;
