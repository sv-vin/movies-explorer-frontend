import React from "react";
import Section from "../Section/Section";

function AboutProject(props) {
    return (
        <Section
            title="О проекте"
            id={props.id}
        >
            <div className="aboutproject__row">
                <div className="aboutproject__size">
                    <h3 className="aboutproject__subtitle">Дипломный проект включал 5 этапов</h3>
                    <p className="aboutproject__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="aboutproject__size">
                    <h3 className="aboutproject__subtitle">На выполнение диплома ушло 5 недель</h3>
                    <p className="aboutproject__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="aboutproject__performance">
                <div className="aboutproject__backend">
                    <h3 className="aboutproject__subtitle-development aboutproject__subtitle-backend">1 неделя</h3>
                    <p className="aboutproject__paragraph-development">Back-end</p>
                </div>
                <div className="aboutproject__frontend">
                    <h3 className="aboutproject__subtitle-development aboutproject__subtitle-frontend">4 недели</h3>
                    <p className="aboutproject__paragraph-development">Front-end</p>
                </div>
            </div>
        </Section>
    );
}

export default AboutProject;