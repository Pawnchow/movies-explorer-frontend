import Movies from "../Movies/Movies";

function SavedMovies({ movies, isSavedMoviesPage, isLogged }) {
  return(
    <Movies movies={movies} isSavedMoviesPage={isSavedMoviesPage} isLogged={isLogged} />
  );
};

export default SavedMovies;
