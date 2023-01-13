import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import moviesApi from "../../ultis/MoviesApi";
import { filterMovies } from "../../ultis/utils";
import { SEARCH_ERROR, NOTHING_FOUND } from "../../ultis/constants";

function Movies({ handleDeleteMovie, handleSaveMovie, savedMovies }) {
  const checkboxInStorage = localStorage.getItem("isShort") === "true" ? true : false;
  const allMovies = localStorage.getItem("allMovies");
  const searchQueryInStorage = localStorage.getItem("searchQuery");

  const [isShort, setIsShort] = useState(checkboxInStorage);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [responseError, setResponseError] = useState("");
  const [isFound, setIsFound] = useState(true);

  function toggleSwitchCheckbox() {
    setIsShort(!isShort);
  }

  function handleSubmitSearchForm(searchQuery) {
    setIsloading(true);
    handleSearchMovies(searchQuery, isShort);
  }

  function handleSearchMovies(searchQuery) {
    localStorage.setItem("isShort", isShort);
    localStorage.setItem("searchQuery", searchQuery);

    if (!allMovies) {
      moviesApi
        .getMovies()
        .then((movies) => {
          localStorage.setItem("allMovies", JSON.stringify(movies));
          const filtered = filterMovies(movies, searchQueryInStorage, isShort);
          setFilteredMovies(filtered);
          checkIsFound(filtered);
        })
        .catch(() => {
          setResponseError(SEARCH_ERROR);
        })
        .finally(() => {
          setIsloading(false);
        });
    } else {
      const filtered = filterMovies(JSON.parse(allMovies), searchQueryInStorage, isShort);
      setFilteredMovies(filtered);
      checkIsFound(filtered);
      setIsloading(false);
    }
  }

  function checkIsFound(movies) {
    if (movies?.length > 0) {
      setIsFound(true);
    } else {
      setIsFound(false);
      setResponseError(NOTHING_FOUND);
    }
  }

  useEffect(() => {
    if (searchQueryInStorage && allMovies) {
      const filtered = filterMovies(JSON.parse(allMovies), searchQueryInStorage, isShort)
      setFilteredMovies(filtered);
      checkIsFound(filtered);
    }
  }, [allMovies, searchQueryInStorage, isShort]);

  return (
    <>
      <Header isLogged={true} />
      <main className="movies">
        <SearchForm
          onSubmitSearchForm={handleSubmitSearchForm}
          isLoading={isLoading}
          onClickCheckbox={toggleSwitchCheckbox}
          isSavedMoviesPage={false}
          isShort={isShort}
        />
        <MoviesCardList
          isLoading={isLoading}
          movies={filteredMovies}
          savedMovies={savedMovies}
          isSavedMoviesPage={false}
          handleDeleteMovie={handleDeleteMovie}
          handleSaveMovie={handleSaveMovie}
          responseError={responseError}
          isFound={isFound}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
