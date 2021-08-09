function AboutProject() {
  return (
    <section className="aboutproject">
      <h1 id="project" className="aboutproject__main-header">О проекте</h1>
      <div className="aboutproject__container aboutproject__container_gap">
        <h2 className="aboutproject__header aboutproject__header_position1">
          Дипломный проект включал 5 этапов
        </h2>
        <h2 className="aboutproject__header aboutproject__header_position2">
          На выполнение диплома ушло 5 недель
        </h2>
        <p className="aboutproject__text aboutproject__text_position1">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <p className="aboutproject__text aboutproject__text_position2">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>
      <div className="aboutproject__container aboutproject__container_size">
        <p className="aboutproject__section aboutproject__section_background-green">
          1 неделя
        </p>
        <p className="aboutproject__section aboutproject__section_background-grey">
          4 недели
        </p>
        <p className="aboutproject__section">Back-end</p>
        <p className="aboutproject__section">Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;
