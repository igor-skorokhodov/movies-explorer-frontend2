import Photo from "../images/photo.jpg";
import Arrow from "../images/arrow.svg";

function AboutMe() {
  return (
    <section className="aboutme">
      <h1 className="aboutproject__main-header" id="student">Студент</h1>
      <div className="aboutme__container">
        <h1 className="aboutme__header">Игорь</h1>
        <h2 className="aboutme__subheader">Фронтенд-разработчик, 35 лет</h2>
        <p className="aboutme__text">
          Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня
          есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом.
          Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
          После того, как прошёл курс по веб-разработке, начал заниматься
          фриланс-заказами и ушёл с постоянной работы.
        </p>
        <div className="aboutme__links">
          <a className="aboutme__link">Facebook</a>
          <a className="aboutme__link">Github</a>
        </div>
        <img className="aboutme__pic" src={Photo} alt="фото профиля"></img>
      </div>
      <h2 className="aboutme__subheader aboutme__subheader_color">Портфолио</h2>
      <div className="aboutme">
        <div className="aboutme__container-portfolio">
          <p className="aboutme__text-portfolio">Статичный сайт</p>
          <img className="aboutme__arrow" src={Arrow}></img>
        </div>
        <div className="aboutme__container-portfolio">
          <p className="aboutme__text-portfolio">Адаптивный сайт</p>
          <img className="aboutme__arrow" src={Arrow}></img>
        </div>
        <div className="aboutme__container-portfolio">
          <p className="aboutme__text-portfolio">Одностраничное приложение</p>
          <img className="aboutme__arrow" src={Arrow}></img>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
