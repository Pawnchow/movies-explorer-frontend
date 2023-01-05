import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import ShowMore from "../ShowMore/ShowMore";
import { useState } from "react";
import moviesApi from "../../ultis/MoviesApi";

function Movies({
  showMore,
  isSavedMoviesPage,
  handleDeleteMovie,
  handleSaveMovie,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  function handleSubmitSearchForm(searchQuery, isShort) {
    setIsloading(true);
    setSearchQuery(searchQuery);
    localStorage.setItem('searchQuery', searchQuery);
    localStorage.setItem('isShortSwitched', isShort);

    if(localStorage.getItem('movies' == null)) {
      moviesApi.getMovies()
        .then(movies => {
          localStorage.setItem('movies', movies);
          
        })
    }
  }



  return (
    <>
      <Header isLogged={true} />
      <main className="movies">
        <SearchForm
          onSubmitSearchForm={handleSubmitSearchForm}
          isLoading={isLoading}
          isSavedMoviesPage={isSavedMoviesPage}
        />
        <MoviesCardList
          movies={movies}
          isSavedMoviesPage={isSavedMoviesPage}
          handleDeleteMovie={handleDeleteMovie}
          handleSaveMovie={handleSaveMovie}
        />
        <ShowMore showMore={showMore} />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
