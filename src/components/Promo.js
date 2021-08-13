import Logo from "../images/landing-logo.svg";

function Promo() {
  return (
    <section className="promo">
    <img
        className="promo__image"
        src={Logo}
        alt="лого крупное"
      ></img>
      <h1 className="promo__header">
        Учебный проект студента факультета Веб-разработки.
      </h1>
    </section>
  );
}

export default Promo;