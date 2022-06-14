import React, { useState, useEffect } from "react";

import car from "../../images/car.png";
import boy from "../../images/boy.png";
import man from "../../images/man.png";

import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies() {
    const [loaded, setLoaded] = useState(true);
    useEffect(() => {
        //тут в потом будем обращаться к апи, пока загрузка
        setTimeout(() => {
            setLoaded(false);
        }, 1000)
    }, [])
    const movies = [
        { image: car, title: '33 слова о дизайне', time: '1ч 47м', _id: 2 },
        { image: boy, title: '33 слова о дизайне', time: '1ч 47м', _id: 3 },
        { image: man, title: '33 слова о дизайне', time: '1ч 47м', _id: 5 },
    ];
    return (
        <div className="movies">
            <SearchForm />
            {loaded ? <Preloader /> : <MoviesCardList movies={movies} />}
        </div>
    );
}

export default SavedMovies;