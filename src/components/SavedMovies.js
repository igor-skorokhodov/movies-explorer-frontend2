import React from "react";
import MoviesCard from "../components/MoviesCard.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Preloader from "../components/Preloader.js";
import SearchForm from "../components/SearchForm.js";

function SavedMovies(props) {

  React.useEffect(() => {
    props.setRoute('savedMovies')
    if (JSON.parse(localStorage.getItem("savedMovies"))) {
    props.setMovies(JSON.parse(localStorage.getItem("savedMovies")));
    props.addingNewCards(window.innerWidth, JSON.parse(localStorage.getItem("savedMovies")));
  }}, [props.array3]);

  React.useEffect(() => {
    props.setMovies(JSON.parse(localStorage.getItem("savedMovies")))
    if (JSON.parse(localStorage.getItem("shortMovies"))) {
    props.setMovies(JSON.parse(localStorage.getItem("shortMovies")))
    props.addingNewCards(window.innerWidth, JSON.parse(localStorage.getItem("savedMovies")));
  }}, [props.trig]);

  return (
    <>
      <Header
        route="savedMovies"
        loggedIn={props.loggedIn}
        name="Выйти"
        signOut={props.signOut}
        isButtonClicked={props.isButtonClicked}
        headerButtonClicked={props.headerButtonClicked}
        loggedIn={props.loggedIn}
      />
      <SearchForm
        setWords={props.setWords}
        searchMovies={props.searchMovies}
        setDemand={props.setDemand}
        demand={props.demand}
        searchWords={props.searchWords}
        search={props.search}
        addingCards={props.addingNewCards}
        movies={props.movies}
        addingNewCards={props.addingNewCards}
        shortMovies={props.shortMovies}
        setShortMovies={props.setShortMovies}
        width={props.width}
        route={props.route}
        savedMovies={props.savedMovies}
        trig={props.trig}
        setTrig={props.setTrig}
      />
      <Preloader />
      <div className={"moviescardlist"}>
        {props.array.map((i) => {
          return (
            <MoviesCard
              key={i._id}
              movieId={i.movieId}
              name={i.nameRU}
              url={i.image}
              time={i.duration}
              trailer={i.trailer}
              likeMovie={props.likeMovie}
              card={i}
              savedMovies={props.savedMovies}
              route={props.route}
            />
          );
        })}
      </div>
      <button
        className={
          props.array2.rounds > 4 || props.rounds > 4
            ? "moviescardlist__button"
            : "moviescardlist__button_invisible"
        }
        onClick={props.buttonClick}
      >
        Еще
      </button>
      <Footer />
    </>
  );
}

export default SavedMovies;
