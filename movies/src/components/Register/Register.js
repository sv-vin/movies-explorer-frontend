import React from "react";
import FormAuthentication from "../FormAuthentication/FormAuthentication";

function Register() {
    return (
        <>
            <FormAuthentication
                btn='Зарегистрироваться'
                paragraphLink='Уже зарегистрированы?'
                to='/signin'
                linkText='Войти'
                formName='formregister'
                title='Добро пожаловать!'
            >
                <div className="label-box">
                    <label className="formauthentication__label" htmlFor="nameregister">Имя</label>
                    <input
                        className="formauthentication__input"
                        id="nameregister"
                        type="text"
                        name="name"
                        minLength="2"
                        maxLength="40"
                        required
                    />
                    <label className="formauthentication__label" htmlFor="emailregister">E-mail</label>
                    <input
                        className="formauthentication__input"
                        id="emailregister"
                        type="email"
                        name="email"
                        minLength="2"
                        maxLength="40"
                        required
                    />
                    <label className="formauthentication__label" htmlFor="passwordregister">Пароль</label>
                    <input
                        className="formauthentication__input"
                        id="passwordregister"
                        type="password"
                        name="password"
                        minLength="6"
                        maxLength="200"
                        required
                    />
                    <p className="formauthentication__error">Что-то пошло не так...</p>
                </div>
            </FormAuthentication>
        </>
    );
}

export default Register;