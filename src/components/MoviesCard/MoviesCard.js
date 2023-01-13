import "./MoviesCard.css";
import { formatMovieDuration } from "../../ultis/utils";

function MoviesCard({ movie, isSavedMoviesPage, onDelete, onSave, isSaved }) {
  const { nameRU, image, duration, trailerLink } = movie;
  const formatedDuration = formatMovieDuration(duration);

  function handleDeleteMovie() {
    onDelete(movie);
  }

  function handleSaveMovie() {
    onSave(movie);
  }

  const getButtonMarkup = () => {
    if (isSaved && !isSavedMoviesPage) {
      return (
        <button
          className="movie-card__btn movie-card__btn_saved"
          onClick={handleDeleteMovie}
        />
      );
    } else if (isSavedMoviesPage) {
      return (
        <button
          className="movie-card__btn movie-card__btn_remove"
          onClick={handleDeleteMovie}
        />
      );
    }
    return (
      <button
        className="movie-card__btn movie-card__btn_save"
        onClick={handleSaveMovie}
      />
    );
  };

  return (
    <li className="movie-card">
      <a
        className="movie-card__trailer-link"
        href={trailerLink}
        target={"_blank"}
        rel="noreferrer"
      >
        <img className="movie-card__image" src={!isSavedMoviesPage ? `https://api.nomoreparties.co${image.url}` : image} alt={nameRU} />
      </a>
      <div className="movie-card__desc">
        <h3 className="movie-card__title">{nameRU}</h3>
        {getButtonMarkup()}
      </div>
      <p className="movie-card__duration">{formatedDuration}</p>
    </li>
  );
}

export default MoviesCard;
