function Techs() {
  return (
    <section className="techs">
      <h1 className="aboutproject__main-header" id="tech">Технологии</h1>
      <div className="techs__container">
        <h2 className="techs__header">7 технологий</h2>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
      </div>
      <ul className="techs__list">
        <li className="techs__point">HTML</li>
        <li className="techs__point">CSS</li>
        <li className="techs__point">JS</li>
        <li className="techs__point">React</li>
        <li className="techs__point">Git</li>
        <li className="techs__point">Express.js</li>
        <li className="techs__point">MongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
