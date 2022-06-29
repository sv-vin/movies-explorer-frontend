import React, { useState } from "react";
import Search from '../../images/searchb.svg';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
  const [searchFilmValue, setSearchFilmValue] = useState(
    props.valueSearch || ""
  
  );
  const [searchFilmError, setSearchFilmError] = useState(
    "Нужно ввести ключевое слово"
  );

  const [searchFilmDirty, setSearchFilmDirty] = useState(false);

  function handleChangeSearchFilm(e) {
    e.preventDefault();
    localStorage.setItem("moviesSearchValue", JSON.stringify(e.target.value));
    setSearchFilmValue(JSON.parse(localStorage.getItem("moviesSearchValue")));

    if (!e.target.validity.valid && e.target.value.length === 0) {
      setSearchFilmError("Нужно ввести ключевое слово");
    } else {
      setSearchFilmError("");
    } 
  } 

 
  function handleEnter(event) {
    event.preventDefault();
    props.enterHandler(searchFilmValue);

  }

  function blurHandler(e) {
    switch (e.target.name) {
      case "searchmovie":
        setSearchFilmDirty(true);
        break;
      default:
        break;
    }
  }
  
  return (
    <div className="search__container">
      <form
        className="searchform"
        name="formsearchmovie"
        onSubmit={handleEnter}
      >

        <input
          className="searchform__input"
          type="text"
          id="movie"
          name="searchmovie"
          onChange={handleChangeSearchFilm}
          onKeyUp={searchFilmValue ? null : handleEnter}
          onBlur={blurHandler}
          value={searchFilmValue || ""}
          placeholder="Фильм"
          required
        />
        <button className="searchform__btn" type="submit">
          <img className="searchform__btn-find" src={Search} alt="Поиск" />
        </button>
      </form>
      {searchFilmDirty && searchFilmError && (
            <div className="error-form error-form__search">{searchFilmError}</div>
          )}
      {props.pathMovies && (
        <FilterCheckbox
          checkShort={props.checkShortFilms}
          onChecked={props.onCheckedFilms}
        />
      )}
      {props.pathMoviesSave && (
        <FilterCheckbox
          checkShort={props.checkShortFilmsSave}
          onChecked={props.onCheckedSaveFilms}
        />
      )}
    </div>
  );
}

export default SearchForm;