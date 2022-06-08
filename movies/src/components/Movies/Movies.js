import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";

import man from "../../images/man.png";
import scate from "../../images/scate.png";
import dance from "../../images/dance.png";
import disco from "../../images/disco.png";
import friends from "../../images/friends.png";
import room from "../../images/room.png";
import street from "../../images/street.png";
import run from "../../images/run.png";
import car from "../../images/car.png";
import smoke from "../../images/smoke.png";
import work from "../../images/work.png";
import boy from "../../images/boy.png";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies(props) {
    const [loaded, setLoaded] = useState(true);
    useEffect(() => {
        //тут в потом будем обращаться к апи, пока загрузка через сек
        setTimeout(() => {
            setLoaded(false);
        }, 1000)
    }, [])
    const movies = [
        { image: car, title: '33 слова о дизайне', time: '1ч 47м', _id: 9 },
        { image: boy, title: '33 слова о дизайне', time: '1ч 47м', _id: 12 },
        { image: man, title: '33 слова о дизайне', time: '1ч 47м', _id: 2 },
        { image: dance, title: '33 слова о дизайне', time: '1ч 47м', _id: 1 },
        { image: scate, title: '33 слова о дизайне', time: '1ч 47м', _id: 5 },
        { image: room, title: '33 слова о дизайне', time: '1ч 47м', _id: 4 },
        { image: friends, title: '33 слова о дизайне', time: '1ч 47м', _id: 6 },
        { image: street, title: '33 слова о дизайне', time: '1ч 47м', _id: 7 },
        { image: run, title: '33 слова о дизайне', time: '1ч 47м', _id: 8 },

        { image: disco, title: '33 слова о дизайне', time: '1ч 47м', _id: 3 },
        { image: smoke, title: '33 слова о дизайне', time: '1ч 47м', _id: 10 },
        { image: work, title: '33 слова о дизайне', time: '1ч 47м', _id: 11 },

    ];
    return (
        <div className="movies">
            <SearchForm />
            {loaded ? <Preloader /> : <MoviesCardList movies={movies} />}
        </div>
    );
}

export default Movies;