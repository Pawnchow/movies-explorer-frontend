import './MoviesCard.css';
import { formatMovieDuration } from '../../ultis/utils';
import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';



function MoviesCard({ movie, isSavedMoviesPage, handleDeleteMovie, handleSaveMovie }) {

  const { nameRU, image, duration, trailerlink } = movie;
  const formatedDuration = formatMovieDuration(duration);
  const currentUser = useContext(CurrentUserContext);
  const isOwn = movie.owner === currentUser._id;
 



  const buttonMarkup = () => {
    if (isOwn && !isSavedMoviesPage) {
      return (
        <button className='movie-card__btn movie-card__btn_saved' onClick={handleDeleteMovie(movie._id)} />
      )
    }
    else if (isOwn && isSavedMoviesPage) {
      return (
        <button className='movie-card__btn movie-card__btn_remove' onClick={handleDeleteMovie(movie._id)} />
      )
    }
    return (
      <button className='movie-card__btn movie-card__btn_save' onClick={handleSaveMovie(movie)} />
    )
  }


  return (
    <li className='movie-card'>
      <a className='movie-card__trailer-link' href={trailerlink} target={'_blank'} rel='noreferrer'>
        <img className='movie-card__image' src={`https://api.nomoreparties.co${image.url}` || image} alt={nameRU} />
      </a>
      <div className='movie-card__desc'>
          <h3 className='movie-card__title'>{nameRU}</h3>
          {buttonMarkup()}
      </div>
        <p className='movie-card__duration'>{formatedDuration}</p>
    </li>
  );
};

export default MoviesCard;
