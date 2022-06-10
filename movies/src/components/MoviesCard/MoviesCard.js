import React from "react";

function MoviesCard(props) {

    return (
        <article className="moviescard">
            <div className="moviescard__text">
                <div className="moviescard__row">
                    <h2 className="moviescard__title">{props.title}</h2>
                    <p className="moviescard__time">{props.time}</p>
                </div>
                <button className={`moviescard__${props.pathSavedMovies ? 'cross' : 'saved'}`} type="button"></button>

            </div>
            <img className="moviescard__image" src={props.image} alt={props.title} />

        </article>
    ); 
}

export default MoviesCard;