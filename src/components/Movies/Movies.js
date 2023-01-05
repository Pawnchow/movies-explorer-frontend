import './Movies.css'
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import ShowMore from '../ShowMore/ShowMore';


function Movies({ movies, showMore, isSavedMoviesPage, onSubmitSearchForm, isLoading, handleDeleteMovie, handleSaveMovie }) {
  return (
    <>
      <Header isLogged={true} />
      <main className="movies">
        <SearchForm  onSubmitSearchForm={onSubmitSearchForm} isLoading={isLoading} />
        <MoviesCardList movies={movies} isSavedMoviesPage={isSavedMoviesPage} handleDeleteMovie={handleDeleteMovie} handleSaveMovie={handleSaveMovie}/>
        <ShowMore showMore={showMore} />
      </main>
      <Footer />
    </>
  );
};

export default Movies;
