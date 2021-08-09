import React from "react";
import MoviesCard from "../components/MoviesCard.js";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Preloader from "../components/Preloader.js";
import SearchForm from "../components/SearchForm.js";

function Movies(props) {
  const adress = "https://api.nomoreparties.co";
  const [likes, setLikes] = React.useState([]);

  React.useEffect(() => {
    props.setRoute("movies");
    if (localStorage.getItem("movies")) {
      props.setMovies(JSON.parse(localStorage.getItem("movies")));
      props.addingNewCards(window.innerWidth, JSON.parse(localStorage.getItem("movies")));
    }
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem("movies")) {
    props.addingNewCards(window.innerWidth, JSON.parse(localStorage.getItem("movies")));
    props.setMovies(JSON.parse(localStorage.getItem("movies")));
  }}, [props.array3]);

  React.useEffect(() => {
    props.setMovies(JSON.parse(localStorage.getItem("movies")))
    if (JSON.parse(localStorage.getItem("shortMovies"))) {
    props.setMovies(JSON.parse(localStorage.getItem("shortMovies")))
    props.addingNewCards(window.innerWidth, JSON.parse(localStorage.getItem("shortMovies")));}
  }, [props.trig]);

  return (
    <>
      <Header
        route="movies"
        signUp={props.signUp}
        signIn={props.signIn}
        email={props.email}
        loggedIn={props.loggedIn}
        name="Выйти"
        signOut={props.signOut}
        tip="signOut"
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
        array3={props.array3}
        trig={props.trig}
        setTrig={props.setTrig}
      />
      <Preloader />
      <div className="moviescardlist">
        {props.array.map((i) => {
          return (
            <MoviesCard
              key={i.id}
              name={i.nameRU}
              url={`${adress}${i.image.url}`}
              time={i.duration}
              trailer={i.trailerLink}
              likeMovie={props.likeMovie}
              card={i}
              savedMovies={props.savedMovies}
              isLiked={props.isLiked}
              array={props.array3}
              setLikes={setLikes}
              check={props.check}
            />
          );
        })}
      </div>
      <button
        className={
          props.array2.rounds > 4 || props.array2.rounds > 4
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

export default Movies;
