import React from "react";
import Section from "../Section/Section";
import MyPhoto from "../../images/author.jpg";

function Main(props) {
    return (
        <Section
            title="Студент"
            id={props.id}
        >
            <div className="aboutme">
                <div className="aboutme__row">
                    <div className="aboutme__text">
                        <h3 className="aboutme__name">Светлана</h3>
                        <p className="aboutme__job">Фронтенд-разработчик, 24 года</p>
                        <p className="aboutme__description">Я из Республики Беларусь, родилась и живу в Минске. Закончила экономический факультет по специальности бух. учет, анализ и аудит. Я люблю слушать музыку. Недавно начала кодить. После того, как прошла курс по веб-разработке, начала заниматься фриланс-заказами и ушёла с постоянной работы.</p>
                        <div>
                            <a className="aboutme__social" href="/">Facebook</a>
                            <a className="aboutme__social" href="/">Github</a>
                        </div>
                    </div>
                    <img className="aboutme__photo" src={MyPhoto} alt="Автор" />
                </div>
            </div>
        </Section>
    );
}

export default Main;