import Movies from "../Movies/Movies";

function SavedMovies({ movies, isSavedMoviesPage, handleDeleteMovie, handleSaveMovie }) {
  return(
    <Movies movies={movies} isSavedMoviesPage={isSavedMoviesPage} showMore={false} handleDeleteMovie={handleDeleteMovie} handleSaveMovie={handleSaveMovie} />
  );
};

export default SavedMovies;
