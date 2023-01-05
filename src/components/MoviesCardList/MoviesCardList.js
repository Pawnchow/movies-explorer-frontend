import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";

function MoviesCardList({
  movies,
  isSavedMoviesPage,
  handleDeleteMovie,
  handleSaveMovie,
  isLoading,
}) {
  return (
    <section className="movie-card-list">
      {isLoading ? (
        <Preloader />
      ) : (
        <ul className="movie-card-list__items">
          {movies.map((i) => (
            <MoviesCard
              movie={i}
              key={i.id}
              isSavedMoviesPage={isSavedMoviesPage}
              handleDeleteMovie={handleDeleteMovie}
              handleSaveMovie={handleSaveMovie}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default MoviesCardList;
