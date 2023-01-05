import { SHORT_MOVIE_DURATION } from "./constants";

export function formatMovieDuration(duration) {
  if (duration >= 60) {
    const minutes = duration % 60;
    return `${Math.floor(duration / 60)}ч ${minutes > 0 ? minutes + "м" : ""}`
  }
  return `${duration}м`
};

export function filterShortMovies(movies, isShort) {
  if (isShort) {
    return movies.filter(movie => movie.duration <= SHORT_MOVIE_DURATION);
  } else {
    return movies;
  }
};
