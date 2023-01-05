import "./MoviesCard.css";
import { formatMovieDuration } from "../../ultis/utils";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCard({ movie, isSavedMoviesPage, onDelete, onSave }) {
  const { nameRU, image, duration, trailerlink } = movie;
  const formatedDuration = formatMovieDuration(duration);
  const currentUser = useContext(CurrentUserContext);
  const isOwn = movie.owner === currentUser._id;

  function handleDeleteMovie() {
    onDelete(movie._id);
  }

  function handleSaveMovie() {
    onSave(movie);
  }

  const buttonMarkup = () => {
    if (isOwn && !isSavedMoviesPage) {
      return (
        <button
          className="movie-card__btn movie-card__btn_saved"
          onClick={handleDeleteMovie}
        />
      );
    } else if (isOwn && isSavedMoviesPage) {
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
        href={trailerlink}
        target={"_blank"}
        rel="noreferrer"
      >
        <img className="movie-card__image" src={image} alt={nameRU} />
      </a>
      <div className="movie-card__desc">
        <h3 className="movie-card__title">{nameRU}</h3>
        {buttonMarkup()}
      </div>
      <p className="movie-card__duration">{formatedDuration}</p>
    </li>
  );
}

export default MoviesCard;
