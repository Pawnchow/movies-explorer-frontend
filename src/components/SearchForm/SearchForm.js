import "./SearchForm.css";
import useForm from "../../hooks/useForm";
import { useEffect } from "react";

function SearchForm({ onSubmitSearchForm, onClickCheckbox, isLoading, isSavedMoviesPage, isShort }) {
  const { values, isFormValid, handleChange, setValues, setIsFormValid } = useForm();

  function handleSubmitSearchForm(evt) {
    evt.preventDefault();
    onSubmitSearchForm(values.searchQuery);
  };

  useEffect(() => {
    if(!isSavedMoviesPage) {
      const input = localStorage.getItem('searchQuery');
      if (input) {
        setValues({searchQuery: input});
        setIsFormValid(true);
      }
    }
  }, [isSavedMoviesPage, setValues, setIsFormValid])

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmitSearchForm}>
        <span className="search__icon" />
        <div className="search__input-wrap">
          <input
            className="search__input"
            type="text"
            placeholder="Фильм"
            required={isSavedMoviesPage ? false : true}
            name="searchQuery"
            id="searchQuery"
            value={values.searchQuery || ''}
            disabled={isLoading}
            onChange={handleChange}
          />
          <button className="search__button" type="submit" disabled={(isLoading || !isFormValid)}>
            Найти
          </button>
        </div>
        <div className="search__checkbox-wrap">
          <label className="search__checkbox-switch">
            <input
              className="search__checkbox"
              id="search-checkbox"
              name="search-checkbox"
              type="checkbox"
              onChange={onClickCheckbox}
              checked={isShort}
              disabled={isLoading}
            />
            <span className="search__checkbox-slider round" />
          </label>
          <p className="search__checkbox-title">Короткометражки</p>
        </div>
      </form>
      <hr />
    </section>
  );
}

export default SearchForm;
