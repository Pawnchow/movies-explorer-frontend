import "./SavedMovies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { useEffect, useState } from "react";
import { filterMovies } from "../../ultis/utils";
import { NOTHING_FOUND } from "../../ultis/constants";

function SavedMovies({ handleDeleteMovie, savedMovies }) {
  const [isShort, setIsShort] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [responseError, setResponseError] = useState("");
  const [isFound, setIsFound] = useState(true);

  function toggleSwitchCheckbox() {
    setIsShort(!isShort);
  }

  function handleSubmitSearchForm(value) {
    setSearchQuery(value);
    setFilteredMovies(filterMovies(savedMovies, searchQuery, isShort));
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
    const filtered = filterMovies(savedMovies, searchQuery, isShort);
    setFilteredMovies(filtered);
    if (searchQuery) {
      checkIsFound(filtered);
    } else {
      setIsFound(true)
    }
  }, [searchQuery, isShort, savedMovies]);

  return (
    <>
      <Header isLogged={true} />
      <main className="saved-movies">
        <SearchForm
          onSubmitSearchForm={handleSubmitSearchForm}
          onClickCheckbox={toggleSwitchCheckbox}
          isSavedMoviesPage={true}
          isShort={isShort}
        />
        <MoviesCardList
          movies={filteredMovies}
          savedMovies={savedMovies}
          isSavedMoviesPage={true}
          handleDeleteMovie={handleDeleteMovie}
          responseError={responseError}
          showMore={false}
          isFound={isFound}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
