import React, { useCallback, useEffect, useState } from "react";

function MoviesCard(props) {
  const [isCardSaveClicked, setIsCardSaveClicked] = useState(true);

  const setSaved = useCallback(() => {
    const saveCard = props.saveMovies.find(
      (movie) => movie.movieId === props.id
    );
    if (saveCard) {
      setIsCardSaveClicked(true);
    } else {
      setIsCardSaveClicked(false);
    }
  }, [props.id, props.saveMovies]);

  useEffect(() => {
    setSaved();
  }, [setSaved]);

  const movieButtonSaveClassName = `moviescard__saved ${isCardSaveClicked ? "moviescard__saved_active" : ""
    }`;

  const movieButtonDeleteClassName = `moviescard__cross`;
  function handleSaveClick(evt) {
    evt.stopPropagation();
    if (!isCardSaveClicked) {
      props.onSaveMovie({
        country: props.country || "default",
        director: props.director,
        duration: props.duration,
        year: props.year,
        description: props.description,
        image: props.image.url
          ? `https://api.nomoreparties.co/${props.image.url}`
          : "https://www.youtube.com",
        trailerLink: props.trailerLink,
        movieId: props.id,
        nameRU: props.nameRU,
        nameEN: props.nameEN,
        thumbnail: props.image.formats.thumbnail.url
          ? `https://api.nomoreparties.co/${props.image.formats.thumbnail.url}`
          : "https://www.youtube.com",
        owner: props.owner,
      });
      setIsCardSaveClicked(true);
    } else {
      const saveCard = props.saveMovies.find(
        (movie) => movie.movieId === props.id
      );
      props.handleDeleteSaveMovie(saveCard);
      setIsCardSaveClicked(false);
    }
  }

  function handleDeleteClick(evt) {
    props.handleDeleteSaveMovie(props);
  }

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + "ч " + minutes + "м";
  }
  const style = {
    textDecoretion: "none",
  };
  return (
    <article className="moviescard">
      <a
        className={style}
        href={props.trailerLink}
        target="_blank"
        rel="noopener noreferrer"
      >
      </a>
      <div className="moviescard__text">
        <div className="moviescard__row">
          <h2 className="moviescard__title">{props.nameRU}</h2>
          <p className="moviescard__time">{getTimeFromMins(props.duration)}</p>
        </div>
        <button
          className={
            props.pathSavedMovies
              ? movieButtonDeleteClassName
              : movieButtonSaveClassName
          }
          type="button"
          onClick={
            props.pathSavedMovies ? handleDeleteClick : handleSaveClick
          }
        ></button>
      </div>
      <img
        className="moviescard__image"
        src={
          !props.pathSavedMovies
            ? `https://api.nomoreparties.co/${props.image.url}`
            : props.image
        }
        alt={props.nameRU}
      />
    </article>
  );
}

export default MoviesCard;
