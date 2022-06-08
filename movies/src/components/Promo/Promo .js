import React from "react";
import landingLogo from "../../images/landingLogo.svg";

function Promo() {
    return (
        <section className="promo">
            <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
            <div className='promo__logo-box'><img className='promo__logo' src={landingLogo} alt="landingLogo" /></div>
        </section>
    );
}

export default Promo;