import Movies from "../Movies/Movies";

function SavedMovies({
  movies,
  isSavedMoviesPage,
  handleDeleteMovie,
}) {
  return (
    <Movies
      movies={movies}
      isSavedMoviesPage={true}
      showMore={false}
      handleDeleteMovie={handleDeleteMovie}
    />
  );
}

export default SavedMovies;
