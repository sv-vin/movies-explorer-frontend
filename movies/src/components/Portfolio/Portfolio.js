import React from "react";
import Arrow from "../../images/arrow.svg";

function Portfolio() {
    return (
        <div className="portfolio">
            <div className="portfolio__container">
                <h3 className="portfolio__subtitle">Портфолио</h3>
                <div className="portfolio__row">
                    <a className="portfolio__project" href="https://github.com/sv-vin/how-to-learn" target="_blank" rel="noreferrer">Статичный сайт</a>
                    <img className="portfolio__arrow" src={Arrow} alt="Стрелка" />
                </div>
                <div className="portfolio__row">
                    <a className="portfolio__project" href="https://github.com/sv-vin/russian-travel" target="_blank" rel="noreferrer">Адаптивный сайт</a>
                    <img className="portfolio__arrow" src={Arrow} alt="Стрелка" />
                </div>
                <div className="portfolio__row">
                    <a className="portfolio__project" href="https://github.com/sv-vin/react-mesto-api-full" target="_blank" rel="noreferrer">Одностраничное приложение</a>
                    <img className="portfolio__arrow" src={Arrow} alt="Стрелка" />
                </div>
            </div>
        </div>
    );
}

export default Portfolio;