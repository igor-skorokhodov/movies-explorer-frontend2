import React from "react";

function MoviesCard(props) {
  let isLiked = false;

  function handleClick() {
    window.location.href = props.trailer;
  }

  function handleLikeClick() {
    props.likeMovie(props.card);
  }

  function turningIntInTime(props) {
    const hour = Math.trunc(props / 60);
    const min = Math.trunc((props / 60 - Math.trunc(props / 60)) * 60);
    return `${hour}ч ${min}м`;
  }

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isInSaved = props.route === "savedMovies";

  if(JSON.parse(localStorage.getItem('savedMovies'))) {
  JSON.parse(localStorage.getItem('savedMovies')).forEach(element => {
    if (props.card.id === element.movieId) {
      isLiked = true;
    };
  });}
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `moviescard__heart ${
    isLiked ? "moviescard__heart_anabled" : ""
  } ${isInSaved ? "moviescard__close" : ""}`;
  const moviesCardInSaved = `moviescard ${isInSaved ? "moviescard_hover" : ""}`;

  return (
    <article className={moviesCardInSaved}>
      <img
        className="moviescard__picture"
        src={props.url}
        alt={props.name}
        onClick={handleClick}
      />
      <div className="moviescard__container">
        <h3 className="moviescard__title" onClick={handleClick}>
          {props.name}
        </h3>
        <button
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
          type="button"
          aria-label="Лайк"
        ></button>
      </div>
      <p className="moviescard__time" onClick={handleClick}>
        {turningIntInTime(props.time)}
      </p>
    </article>
  );
}

export default MoviesCard;
