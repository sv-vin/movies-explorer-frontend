import React from "react";
import Search from '../../images/searchb.svg';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
    return (
        <div className="search__container">
            <form className="searchform" name="formsearchmovie">
                <input
                    className="searchform__input"
                    type="text"
                    id="movie"
                    minLength="2"
                    maxLength="40"
                    placeholder="Фильм"
                    required
                />
                <button className="searchform__btn">
                    <img className="searchform__btn-find" src={Search} alt="Поиск" />
                </button>
            </form>
            <FilterCheckbox />
        </div >
    );
}

export default SearchForm;