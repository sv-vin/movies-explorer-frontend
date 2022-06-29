import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/logos.svg";

function FormAuthentication(props) {
  return (
    <div className="formauthentication__container">
      <form
        className="formauthentication"
        action="/"
        method="PATCH"
        name={props.formName}
        onSubmit={props.handleSubmit}
      >
        <Link to="/" className="header__logo-authentication">
          <img className="logo" src={Logo} alt="logo" />
        </Link>
        <h2 className="formauthentication__title">{props.title}</h2>
        {props.children}
        {props.dataDirty && props.dataError && (
          <div className="error-form">{props.dataError}</div>
        )}
        <button
          className="formauthentication__btn"
          type="submit"
          disabled={props.formValid}
        >
          {props.btn}
        </button>
      </form>
      <div className="formauthentication__signin">
        <p className="formauthentication__signin-paragraph">
          {props.paragraphLink}
          <Link className="formauthentication__link" to={props.to}>
            {props.linkText}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default FormAuthentication;