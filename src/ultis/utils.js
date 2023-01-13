import { SHORT_MOVIE_DURATION } from "./constants";

export function formatMovieDuration(duration) {
  if (duration >= 60) {
    const minutes = duration % 60;
    return `${Math.floor(duration / 60)}ч ${minutes > 0 ? minutes + "м" : ""}`;
  }
  return `${duration}м`;
}

export function filterByShort(movies) {
  return movies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
}

export function filterMovies(movies, searchQuery, isShort) {
  const moviesByQuery = movies.filter((item) => {
    const nameRU = String(item.nameRU).toLowerCase();
    const nameEN = String(item.nameEN).toLowerCase();
    const queryLow = searchQuery.toLowerCase().trim();
    return nameRU.indexOf(queryLow) !== -1 || nameEN.indexOf(queryLow) !== -1;
  });
  if (isShort) {
    return filterByShort(moviesByQuery);
  }
  return moviesByQuery;
}

export function checkSavedMovie(movies, movie) {
  return movies?.find((item) => {
    return item.movieId === movie.id;
  });
}
