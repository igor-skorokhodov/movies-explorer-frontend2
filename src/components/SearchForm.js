import React from "react";

function SearchFrom(props) {
  const [active, isActive] = React.useState(false);

  function handleChangeInput(e) {
    props.setDemand(e.target.value);
  }

  function submitDemand() {
    props.setWords(props.demand);
  }

  function showShortMovies() {
    props.setTrig(1)
    if (props.route === "savedMovies") {
      isActive(true);
      props.setShortMovies(
        JSON.parse(localStorage.getItem('savedMovies')).filter((movie) => movie.duration <= 40)
      );
      props.addingNewCards(
        props.width,
        JSON.parse(localStorage.getItem('savedMovies')).filter((movie) => movie.duration <= 40)
      );

      localStorage.setItem(
        "shortMovies",
        JSON.stringify(
          JSON.parse(localStorage.getItem('savedMovies')).filter((movie) => {
            return movie.duration <= 40;
          })
        )
      );
    } else {
      isActive(true);
      props.setShortMovies(
        JSON.parse(localStorage.getItem('movies')).filter((movie) => movie.duration <= 40)
      );
      props.addingNewCards(
        props.width,
        JSON.parse(localStorage.getItem('movies')).filter((movie) => movie.duration <= 40)
      );

      localStorage.setItem(
        "shortMovies",
        JSON.stringify(
          JSON.parse(localStorage.getItem('movies')).filter((movie) => {
            return movie.duration <= 40;
          })
        )
      );
    }
  }

  function unshowShortMovies() {
    props.setTrig(2)
    isActive(false);
    props.setShortMovies([]);
    props.addingNewCards(props.width, JSON.parse(localStorage.getItem('movies')));

    localStorage.removeItem("shortMovies");
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.searchMovies();
  }

  return (
    <>
      <section className="searchform">
        <div className="searchform__container searchform__container_border-buttom">
          <form className="searchform__form" onSubmit={handleSubmit}>
            <button
              className={`searchform__button searchform__button_bright ${
                window.innerWidth < 768
                  ? "searchform__button_bright_invisible"
                  : ""
              }`}
            ></button>
            <input
              className="searchform__input"
              onChange={handleChangeInput}
              type="text"
              value={props.demand}
              name="demand"
              required
              id="searchform__input"
              placeholder="Фильм"
            />
            <button
              type="submit"
              className="searchform__button searchform__button_green"
              onClick={submitDemand}
            ></button>
          </form>
        </div>
        <div className="searchform__container-switch">
          <button
            onClick={active ? unshowShortMovies : showShortMovies}
            className={
              active
                ? "searchform__switch searchform__switch_active"
                : "searchform__switch searchform__switch_inactive"
            }
          ></button>
          <p className="searchform__text">Короткометражки</p>
        </div>
      </section>
    </>
  );
}

export default SearchFrom;
