import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from "../Preloader/Preloader";
import ShowMore from "../ShowMore/ShowMore";
import { useState, useEffect } from "react";
import { checkSavedMovie } from "../../ultis/utils";
import useGetWidth from "../../hooks/useGetWidth";

function MoviesCardList({
  movies,
  savedMovies,
  isSavedMoviesPage,
  handleDeleteMovie,
  handleSaveMovie,
  isLoading,
  isFound,
  responseError,
}) {
  const width = useGetWidth();
  const [moviesRenderCounter, setMoviesRenderCounter] = useState(0);
  const [moviesAddCounter, setMoviesAddCounter] = useState(0);

  useEffect(() => {
    if (width >= 1280) {
      setMoviesRenderCounter(12);
      setMoviesAddCounter(3);
    } else if (width < 1280 && width >= 768) {
      setMoviesRenderCounter(8);
      setMoviesAddCounter(2);
    } else if (width < 768 && width >= 480) {
      setMoviesRenderCounter(8);
      setMoviesAddCounter(2);
    } else if (width < 480) {
      setMoviesRenderCounter(8);
      setMoviesAddCounter(2);
    }
  }, [width]);

  function handleClickShowMore() {
    setMoviesRenderCounter(moviesRenderCounter + moviesAddCounter);
  }

  // TODO: изучить красивый условный рендеринг и переписать тернарники
  return (
    <section className="movie-card-list">
      {isLoading ? (
        <Preloader />
      ) : !isFound ? (
        <span className="movie-card-list__response-error">{responseError}</span>
      ) : (
        <ul className="movie-card-list__items">
          {!isSavedMoviesPage
            ? movies?.slice(0, moviesRenderCounter).map((item) => {
                const saved = checkSavedMovie(savedMovies, item);
                return (
                  <MoviesCard
                    movie={{ ...item, _id: saved?._id }}
                    key={item.id}
                    isSavedMoviesPage={isSavedMoviesPage}
                    onDelete={handleDeleteMovie}
                    onSave={handleSaveMovie}
                    isSaved={saved}
                  />
                );
              })
            : movies?.map((item) => {
                const saved = checkSavedMovie(savedMovies, item);
                return (
                  <MoviesCard
                    movie={item}
                    key={item._id}
                    isSavedMoviesPage={isSavedMoviesPage}
                    onDelete={handleDeleteMovie}
                    onSave={handleSaveMovie}
                    isSaved={saved}
                  />
                );
              })}
        </ul>
      )}
      {movies?.length > moviesRenderCounter && !isSavedMoviesPage ? (
        <ShowMore onClick={handleClickShowMore} />
      ) : (
        <></>
      )}
    </section>
  );
}

export default MoviesCardList;
