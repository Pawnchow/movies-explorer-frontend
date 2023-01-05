import "./SearchForm.css";
import useForm from "../../hooks/useForm";
import { useState, useEffect } from "react";


function SearchForm({ onSubmitSearchForm, isLoading, isSavedMoviesPage }) {
  const { values, isFormValid, handleChange, setValues } = useForm();
  const [isShort, setIsShort] = useState(false);

  function handleSwitchCheckbox() {
    setIsShort(!isShort)
  };

  function handleSubmitSearchForm(evt) {
    evt.preventDefault();
    onSubmitSearchForm(values.searchQuery, isShort);
  };

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmitSearchForm}>
        <span className="search__icon" />
        <div className="search__input-wrap">
          <input
            className="search__input"
            type="text"
            placeholder="Фильм"
            required
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
              onChange={handleSwitchCheckbox}
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
