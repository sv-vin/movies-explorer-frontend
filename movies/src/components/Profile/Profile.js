import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext";
import BtnEditProfile from "../BtnEditProfile/BtnEditProfile";
import BtnSaveProfile from "../BtnSaveProfile/BtnSaveProfile";

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);

  const [readOnly, setReadOnly] = useState(true);
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [dataDirty, setDataDirty] = useState(false);
  const [dataError, setDataError] = useState(
    "Что-то пошло не так. Имя не должно быть пустым или некорректный Email"
  );

  const [formValid, setFormValid] = useState(false);
  const disabledBtn =
    currentUser.email === profileEmail && currentUser.name === profileName;
  const edit = "Редактировать";
  const save = "Сохранить";

  useEffect(() => {
    setReadOnly(true);
  }, []);

  useEffect(() => {
    if (dataError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [dataError]);

  useEffect(() => {
    setProfileName(currentUser.name);
    setProfileEmail(currentUser.email);
  }, [currentUser]);

  function handleClickEdit(e) {
    e.preventDefault();
    setReadOnly(false);
  }

  function handleChangeName(e) {
    setProfileName(e.target.value);
    if (
      (!e.target.validity.valid && e.target.value.length < 3) ||
      e.target.value.length > 20
    ) {
      setDataError(
        "Что-то пошло не так. Имя не должно быть пустым или некорректный Email"
      );
      if (!e.target.value) {
        setDataError("Имя не может быть пустым");
      }
    } else {
      setDataError("");
    }
  }

  function handleChangeEmail(e) {
    setProfileEmail(e.target.value);
    if (
      !String(e.target.value)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setDataError(
        "Что-то пошло не так. Имя не должно быть пустым или некорректный Email"
      );
      if (!e.target.value) {
        setDataError("Email не может быть пустым");
      }
    } else {
      setDataError("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: profileName,
      email: profileEmail,
    });
    setReadOnly(true);
  }

  function blurHandler(e) {
    switch (e.target.name) {
      case "nameprofile":
        setDataDirty(true);
        break;
      case "emailprofile":
        setDataDirty(true);
        break;
      default:
        break;
    }
  }

  return (
    <div className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form
          className="profile__form"
          action="/"
          name="formprofile"
          onSubmit={handleSubmit}
        >
          <label className="profile__label" htmlFor="nameprofile">
            Имя
            <input
              type="text"
              className="profile__input"
              name="nameprofile"
              id="nameprofile"
              minLength="2"
              maxLength="20"
              value={profileName ? profileName : ""}
              onChange={handleChangeName}
              onBlur={blurHandler}
              required
              readOnly={readOnly}
            />
          </label>
          <label className="profile__label" htmlFor="emailprofile">
            E-mail
            <input
              type="email"
              className="profile__input"
              id="emailprofile"
              name="emailprofile"
              minLength="2"
              maxLength="100"
              value={profileEmail ? profileEmail : ""}
              onChange={handleChangeEmail}
              onBlur={blurHandler}
              required
              readOnly={readOnly}
            />
          </label>
          {dataDirty && dataError && (
            <div className="error-form error-form__profile">{dataError}</div>
          )}
          {!readOnly ? (
            <BtnSaveProfile
              saveText={save}
              onDisabled={!formValid || disabledBtn}
            />
          ) : (
            <BtnEditProfile editText={edit} onHandleClick={handleClickEdit} />
          )}
        </form>
        <Link className="profile__link" to="/" onClick={props.handleSignOut}>
          Выйти из аккаунта
        </Link>
      </div>
    </div>
  );
}

export default Profile;
