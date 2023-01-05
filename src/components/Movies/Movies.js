import './Movies.css'
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import ShowMore from '../ShowMore/ShowMore';


function Movies({ movies, showMore, isSavedMoviesPage, isLogged }) {
  return (
    <>
      <Header isLogged={isLogged} />
      <main className="movies">
        <SearchForm />
        <MoviesCardList movies={movies} isSavedMoviesPage={isSavedMoviesPage} />
        <ShowMore showMore={showMore} />
      </main>
      <Footer />
    </>
  );
};

export default Movies;
