/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Error from "../Error/Error";
import { CurrentUserContext } from "../context/CurrentUserContext";
import mainApi from "../../utils/MainApi";
import * as auth from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import moviesApi from "../../utils/MoviesApi";

import InfoTooltip from "../InfoTooltip/InfoTooltip";
import unionTrue from "../../images/union.svg";
import unionFalse from "../../images/unionerror.svg";
import BlockRouteUser from "../BlockRouteUser/BlockRouteUser";

function App() {
  const valueData = JSON.parse(localStorage.getItem("moviesSearchValue"));
  const location = useLocation();
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [movies, setMovies] = useState([]);
  const [moviesFilter, setMoviesFilter] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [saveSaveMoviesFilter, setSaveMoviesFilter] = useState([]);
  const [shortMovies, setShortMovies] = useState([]);
  const [shortMoviesSave, setShortMoviesSave] = useState([]);
  const [isData, setIsData] = useState({});
  const [valueSearch, setValueSearch] = useState(valueData);
  const [loaded, setLoaded] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isFilteredSave, setIsFilteredSave] = useState(false);
  const [checkedFilms, setCheckedFilms] = useState(false);
  const [checkedSaveFilms, setCheckedSaveFilms] = useState(false);
  const [permissonCheck, setPermissonCheck] = useState(false);
  const [isInfoTooltip, setInfoTooltip] = useState(false);
  const pathHeadersArray = ["/", "/movies", "/saved-movies", "/profile"];
  const pathFootersArray = ["/", "/movies", "/saved-movies"];
  const pathMovies = location.pathname === "/movies";
  const pathMoviesSave = location.pathname === "/saved-movies";
  const pathHeaders = pathHeadersArray.includes(location.pathname);
  const pathFooters = pathFootersArray.includes(location.pathname);

  // проверка токена
  function checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .examTokenValidation(token)
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
          localStorage.setItem("user", JSON.stringify(res));
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("token");
          handleInfoTooltip({
            union: unionFalse,
            text: "Ошибка токена",
          });
        });
    }
  }

  // загружаем данные пользователя и фильмов
  useEffect(() => {
    setLoaded(true);
    setTimeout(() => {
      if (loggedIn) {
        Promise.all([
          moviesApi.getMovies(),
          mainApi.getAboutUser(),
          mainApi.getSaveMovies(),
        ])
          .then(([movies, user, saveMovies]) => {
            localStorage.setItem("user", JSON.stringify(user));
            setCurrentUser(JSON.parse(localStorage.getItem("user")));
            const userSaveMovie = saveMovies.filter(
              (movie) => movie.owner === user._id
            );
            localStorage.setItem("saveMovies", JSON.stringify(userSaveMovie));
            localStorage.setItem("movies", JSON.stringify(movies));
            setSaveMovies(JSON.parse(localStorage.getItem("saveMovies")));
            setMovies(JSON.parse(localStorage.getItem("movies")));
            setLoaded(false);
          })
          .catch((err) => {
            console.log(err);
            handleInfoTooltip({
              union: unionFalse,
              text: "Ошибка обновления данных",
            });
          });
      }
    }, 1000);
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setPermissonCheck(true);
      return;
    }
    checkToken();
    setPermissonCheck(true);
    setLoggedIn(true);
    setCheckedFilms(JSON.parse(localStorage.getItem("checkedFilms")));
    setCheckedSaveFilms(JSON.parse(localStorage.getItem("checkedSaveFilms")));
  }, []);

  useEffect(() => {
    setMoviesFilter(JSON.parse(localStorage.getItem("moviesSearch")));
    setIsFiltered(JSON.parse(localStorage.getItem("isFiltered")));
  }, []);

  // обновляем кароткометражки
  useEffect(() => {
    setShortMovies(JSON.parse(localStorage.getItem("durationMovieShort")));
    setShortMoviesSave(
      JSON.parse(localStorage.getItem("durationMovieShortSave"))
    );
  }, []);

  // открываем попап 
  function handleInfoTooltip(data) {
    setInfoTooltip(true);
    setIsData({ ...data });
  }

  // закрываем попап
  function closeAllPopups() {
    setInfoTooltip(false);
  }

  // ищем фильм
  function handleEnter(search) {
    const moviesFilter = movies
      ? movies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(search.toLowerCase());
      })
      : [];
    localStorage.setItem("moviesSearch", JSON.stringify(moviesFilter));
    localStorage.setItem("isFiltered", JSON.stringify(true));
    localStorage.setItem("moviesSearchValue", JSON.stringify(search));
    setTimeout(() => {
      setLoaded(false);
      setMoviesFilter(JSON.parse(localStorage.getItem("moviesSearch")));
      setIsFiltered(JSON.parse(localStorage.getItem("isFiltered")));
      setValueSearch(
        JSON.parse(window.localStorage.getItem("moviesSearchValue"))
      );
    }, 450);
  }

  // сохраняем фильм
  function handleSaveMovie(movieData) {
    setSaveMovies([...saveMovies, movieData]);
    mainApi
      .saveMovie(movieData)
      .then((newMovie) => {
        setSaveMovies([...saveMovies, newMovie]);
        localStorage.setItem(
          "saveMovies",
          JSON.stringify([...saveMovies, newMovie])
        );
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip({
          union: unionFalse,
          text: "Ошибка сохранения фильма",
        });
      });
  }

  // ищем сохраненный фильм
  function handleSearchSaveMovie(search) {
    const moviesSaveFilter = saveMovies
      ? saveMovies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(search.toLowerCase());
      })
      : [];
    localStorage.setItem("isFilteredSave", JSON.stringify(true));
    setTimeout(() => {
      setLoaded(false);
      setSaveMoviesFilter(moviesSaveFilter);
      setIsFilteredSave(JSON.parse(localStorage.getItem("isFilteredSave")));
    }, 450);
  }

  // удаляем фильм
  function handleDeleteSaveMovie(saveMovie) {
    mainApi
      .deleteMovie(saveMovie._id || saveMovie.id)
      .then(() => {
        const newCardsArr = saveMovies.filter((c) => c._id !== saveMovie._id);
        const newSavedCardsArr = saveMovies.filter(
          (c) => c._id !== saveMovie._id
        );
        setSaveMovies(newCardsArr);
        setSaveMoviesFilter(newSavedCardsArr);
        handleInfoTooltip({
          union: unionTrue,
          text: "Фильм удален",
        });
        localStorage.removeItem("saveMovies", JSON.stringify(newCardsArr));
        localStorage.removeItem("saveMovies", JSON.stringify(newSavedCardsArr));
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip({
          union: unionFalse,
          text: "Нельзя удалить чужой фильм",
        });
      });
  }

  // регистрация
  function handleRegister(nameRegister, emailRegister, passwordRegister) {
    auth
      .register(nameRegister, emailRegister, passwordRegister)
      .then((res) => {
        if (res) {
          handleInfoTooltip({
            union: unionTrue,
            text: "Вы успешно зарегистрировались!",
          });
          handleLogin(emailRegister, passwordRegister);
          history.push("/movies");
        }
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip({
          union: unionFalse,
          text: `Пользователь с таким email ${emailRegister} уже существует`,
        });
      });
  }

  // авторизация
  function handleLogin(emailLogin, passwordLogin) {
    auth
      .authoriz(emailLogin, passwordLogin)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("moviesSearch", JSON.stringify(moviesFilter));
          window.localStorage.setItem(
            "moviesSearchValue",
            JSON.stringify(valueSearch)
          );
          setLoggedIn(true);
          handleInfoTooltip({
            union: unionTrue,
            text: "Вы успешно вошли!",
          });
          history.push("/movies");
        }
      })
      .then(() => {
        checkToken();
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltip({
          union: unionFalse,
          text: "Вы ввели неправильный логин или пароль",
        });
      });
  }

  // обновляем пользоваеля
  function handleUpdateUser(user) {
    mainApi
      .editProfile(user)
      .then((user) => {
        setCurrentUser(user);
        handleInfoTooltip({
          union: unionTrue,
          text: "Профиль обновлен ",
        });
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((err) => {
        console.log(`Внимание! ${err}`);
        handleInfoTooltip({
          union: unionFalse,
          text: `Пользователь с таким ${user.email} уже существует`,
        });
      });
  }

  // короткометрадные фильмы
  function checkShortFilms(e) {
    setLoaded(true);
    localStorage.setItem("checkedFilms", JSON.stringify(!checkedFilms));
    setTimeout(() => {
      if (!checkedFilms) {
        const durationMovieShort = movies.filter(
          (movie) => movie.duration <= 40
        );
        const durationMovieShortSearch = moviesFilter.filter(
          (movie) => movie.duration <= 40
        );
        localStorage.setItem(
          "durationMovieShort",
          JSON.stringify(durationMovieShort)
        );
        localStorage.setItem(
          "durationMovieShort",
          JSON.stringify(durationMovieShortSearch)
        );
        setShortMovies(JSON.parse(localStorage.getItem("durationMovieShort")));
      } else {
        setMovies(movies);
      }
      setLoaded(false);
    }, 450);
    setCheckedFilms(!checkedFilms);
  }

  // сохраненные короткометражки
  function checkShortFilmsSave(e) {
    setLoaded(true);
    localStorage.setItem("checkedSaveFilms", JSON.stringify(!checkedSaveFilms));
    setTimeout(() => {
      if (!checkedSaveFilms) {
        const durationMovieShortSave = saveMovies.filter(
          (movie) => movie.duration <= 40
        );

        const durationMovieShortSaveSearch = saveSaveMoviesFilter.filter(
          (movie) => movie.duration <= 40
        );

        localStorage.setItem(
          "durationMovieShortSave",
          JSON.stringify(durationMovieShortSave)
        );
        localStorage.setItem(
          "durationMovieShortSaveSearch",
          JSON.stringify(durationMovieShortSaveSearch)
        );
        setShortMoviesSave(
          JSON.parse(localStorage.getItem("durationMovieShortSave"))
        );
      } else {
        setSaveMovies(saveMovies);
      }
      setLoaded(false);
    }, 450);
    setCheckedSaveFilms(!checkedSaveFilms);
  }

  // выход
  function handleSignOut() {
    setLoggedIn(false);
    setCurrentUser([]);
    setCheckedFilms(false);
    setCheckedSaveFilms(false);
    localStorage.clear();
    history.push("/");
  }

  if (!permissonCheck) {
    return null;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {!pathHeaders ? null : <Header loggedIn={loggedIn} />}
      <Switch>
        <Route exact path="/" component={Main} />
        <ProtectedRoute
          path="/movies"
          component={Movies}
          loggedIn={loggedIn}
          handleEnter={handleEnter}
          loaded={loaded}
          isFiltered={isFiltered}
          movies={movies}
          filterMovies={moviesFilter}
          handleSaveMovie={handleSaveMovie}
          saveMovies={saveMovies}
          handleDeleteSaveMovie={(movie) => handleDeleteSaveMovie(movie)}
          checkShortFilms={checkShortFilms}
          onCheckedFilms={checkedFilms}
          shortMovies={shortMovies}
          pathMovies={pathMovies}
          valueSearch={valueSearch}
        />
        <ProtectedRoute
          path="/saved-movies"
          component={SavedMovies}
          loggedIn={loggedIn}
          loaded={loaded}
          handleSearchSaveMovie={handleSearchSaveMovie}
          isFilteredSave={isFilteredSave}
          saveMovies={saveMovies}
          handleDeleteSaveMovie={handleDeleteSaveMovie}
          saveFilterSaveMovies={saveSaveMoviesFilter}
          checkShortFilmsSave={checkShortFilmsSave}
          onCheckedSaveFilms={checkedSaveFilms}
          shortMovies={shortMoviesSave}
          pathMoviesSave={pathMoviesSave}
        />
        <ProtectedRoute
          path="/profile"
          component={Profile}
          onUpdateUser={handleUpdateUser}
          handleSignOut={handleSignOut}
          loggedIn={loggedIn}
        />
        <BlockRouteUser
          path="/signin"
          component={Login}
          handleAuthorization={handleLogin}
          loggedIn={loggedIn}
        />
        <BlockRouteUser
          path="/signup"
          component={Register}
          handleRegistration={handleRegister}
          loggedIn={loggedIn}
        />
        <Route path="*" component={Error} />
      </Switch>
      <InfoTooltip
        isOpen={isInfoTooltip}
        onClose={closeAllPopups}
        loggedIn={loggedIn}
        union={isData}
      />
      {!pathFooters ? null : <Footer />}
    </CurrentUserContext.Provider>
  );
}

export default App;
