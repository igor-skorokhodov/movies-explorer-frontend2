import "../index.css";
import Main from "../components/Main.js";
import Movies from "../components/Movies.js";
import SavedMovies from "../components/SavedMovies.js";
import Navigation from "../components/Navigation.js";
import Profile from "../components/Profile.js";
import Error404 from "../components/Error404.js";
import React from "react";
import mainApi from "../utils/MainApi.js";
import moviesApi from "../utils/MoviesApi.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from "../utils/auth.js";
import Preloader from "./Preloader";

function App() {
  const [headerButtonClicked, isHeaderButtonClicked] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    email: "",
    id: "",
  });
  const [demand, setDemand] = React.useState("");
  const [searchWords, setSearchWords] = React.useState("");
  const [check, setCheck] = React.useState('');
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [shortMovies, setShortMovies] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [loading, isLoading] = React.useState(false);
  const [width, setWidth] = React.useState(0);
  const [array, setArray] = React.useState([]);
  const [array2, setArray2] = React.useState([]);
  const [array3, setArray3] = React.useState([]);
  const [err, setErr] = React.useState(false);
  const history = useHistory();
  const [registeredIn, isRegisteredIn] = React.useState(false);
  const [route, setRoute] = React.useState("");
  const [trig, setTrig] = React.useState(0);
  const [validity, setValidity] = React.useState({
    formErrors: { email: "", password: "", name: "" },
    emailValid: false,
    passwordValid: false,
    formValidReg: false,
    formValidLog: false,
    nameValid: false,
  });
  let index = 0;
  let columns = 0;
  let rounds = 0;

  React.useEffect(() => {
    function handleClick(evt) {
      if (evt.target.classList.contains("navigation_visible")) {
        isButtonClicked("false");
      }
    }

    function handleOnKeyDown(evt) {
      if (evt.key === "Escape") {
        isButtonClicked("false");
      }
    }
    document.addEventListener("keydown", handleOnKeyDown);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("keydown", handleOnKeyDown);
      document.removeEventListener("click", handleClick);
    };
  });

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    console.log('cc')
    mainApi
      .getMovies()
      .then((movies1) => {
        setArray3(movies1.filter((movie) => movie.owner === localStorage.getItem('id')))
        localStorage.setItem(
          "savedMovies",
          JSON.stringify(
            movies1.filter((movie) => movie.owner === localStorage.getItem('id'))
          )
        );
      })
      .catch((err) => {
        console.log(`упс, возникла ошибка! ${err}`);
      });
  }, [check]);

  React.useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener(`resize`, () => {
      setWidth(window.innerWidth);
    });
  }, []);

  function onButtonClick() {
    console.log(array)
    console.log(array2)
    console.log(movies)
    if (array2.columns === 2) {
      if (array2.rounds > 4) {
        let j = 0;
        for (let i = 0; i < array2.columns; i++) {
          j = array2.index;
          setArray2({
            index: array2.index = array2.index + 2,
            rounds: array2.rounds--,
            columns: array2.columns,
          });
          setArray([movies[j + 1], movies[j], ...array]);
        }
      }
    }
    if (array2.columns >= 3) {
      if (array2.rounds > 4) {
        let j = 0;
        for (let i = 0; i < array2.columns; i++) {
          j = array2.index;
          setArray2({
            index: array2.index = array2.index + 3,
            rounds: array2.rounds--,
            columns: array2.columns,
          });
          setArray([movies[j + 2], movies[j + 1], movies[j], ...array]);
        }
      }
    }
    if (array2.columns === 1) {
      if (array2.rounds > 4) {
        let j = 0;
        for (let i = 0; i < array2.columns + 1; i++) {
          j = array2.index;
          setArray2({
            index: array2.index++,
            rounds: array2.rounds - 2,
            columns: array2.columns,
          });
          setArray([movies[j + 1], movies[j], ...array]);
        }
      }
    }
  }

  function addingNewCards(width, arr) {
    if (arr === []) {
      setArray([]);
      return;
    }
    let containerWidth = 0;
    let gapWidth = 0;
    let cardWidth = 0;
    let gap = 24;
    if (width >= 1280) {
      cardWidth = 364;
      containerWidth = width * 0.91;
    }
    if (width >= 768 && width < 1280) {
      cardWidth = 339;
      containerWidth = width * 0.92;
    }
    if (width >= 320 && width < 768) {
      cardWidth = 300;
      containerWidth = width * 0.94;
    }
    gapWidth = (Math.trunc(containerWidth / cardWidth) - 1) * gap;
    columns = Math.trunc((containerWidth - gapWidth) / cardWidth);
    rounds = arr.length / columns;
    if (rounds <= 4) {
      setArray(arr);
      setArray2({ rounds: rounds });
    }
    if (rounds > 4) {
      let arr2 = [];
      for (let i = 0; i < columns * 4; i++) {
        index = i;
        arr2[i] = arr[i];
      }
      setArray(arr2);
      setArray2({ index: index, columns: columns, rounds: rounds });
    }
  }

  function validateField(fieldName, value) {
    let fieldValidationErrors = validity.formErrors;
    let nameValid = validity.nameValid;
    let emailValid = validity.emailValid;
    let passwordValid = validity.passwordValid;
    let emailBoolean = false;
    switch (fieldName) {
      case "name":
        const letters = /^[A-Za-zА-Яа-яё -]+$/;

        if (value.length <= 2) {
          nameValid = value.length <= 2;
          fieldValidationErrors.name = nameValid ? "имя слишком короткое" : "";
        }
        if (value.length >= 30) {
          nameValid = value.length >= 30;
          fieldValidationErrors.name = nameValid ? "имя слишком длинное" : "";
        }
        if (value.length === 0) {
          nameValid = true;
          fieldValidationErrors.name = "";
        }
        if (value.length > 2 && value.length < 30) {
          if ((nameValid = value.match(letters))) {
            nameValid = false;
            fieldValidationErrors.name = "";
          } else {
            nameValid = true;
            fieldValidationErrors.name =
              "имя должно содержать только латиницу, кирилицу, пробел и дефис";
          }
        }
        break;
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid
          ? ""
          : "введите почту корректно";
        emailBoolean = emailValid ? false : true;
        if (value.length === 0) {
          emailBoolean = true;
          fieldValidationErrors.email = "";
        }
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid
          ? ""
          : "пароль сишком короткий";
        if (value.length === 0) {
          passwordValid = false;
          fieldValidationErrors.password = "";
        }
        break;
      default:
        break;
    }
    setValidity({
      formErrors: fieldValidationErrors,
      emailValid: !emailBoolean,
      passwordValid: passwordValid,
      nameValid: nameValid,
      formValidReg:
        validity.emailValid && validity.passwordValid && !validity.nameValid,
      formValidLog: validity.emailValid && validity.passwordValid,
    });
  }

  function likeMovie(movie) {
    let i = 0;
    let j = 0;
    JSON.parse(localStorage.getItem("savedMovies")).forEach((savedMovie) => {
      if (
        savedMovie.movieId === movie.id ||
        savedMovie.movieId === movie.movieId
      ) {
        i = 1;
        mainApi
          .removeMovie(savedMovie._id)
          .then((res) => {
            setCheck(res)
          })
          .catch((err) => {
            console.log(`упс, возникла ошибка! ${err}`);
          });

      } 
    });
    if (i === 0 && j === 0) {
      j = 1;
      mainApi
        .addMovie(movie, localStorage.getItem("id"))
        .then((res) => {setCheck(res)})
        .catch((err) => {
          console.log(`упс, возникла ошибка! ${err}`);
        });

    }
  }

  function handleUpdateUser(name, email) {
    mainApi
      .updateUserInfo(name, email)
      .then((res) => {
        setCurrentUser({
          name: res.name,
          email: res.email,
          id: res.id,
        });
      })
      .catch((err) => {
        console.log(`упс, возникла ошибка! ${err}`);
      });
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function searchMovies() {
    isLoading(true);
    moviesApi
      .getMovies()
      .then((moviesList) => {
        isLoading(false);
        setMovies(
          moviesList.filter((movie) => movie.nameRU.includes(searchWords))
        );
        if (route === "movies") {
          localStorage.setItem(
            "movies",
            JSON.stringify(
              moviesList.filter((movie) => {
                return movie.nameRU.includes(searchWords);
              })
            )
          );
          addingNewCards(
            width,
            moviesList.filter((movie) => movie.nameRU.includes(searchWords))
          );
        }
        if (route === "savedMovies") {
          localStorage.setItem(
            "savedMovies",
            JSON.stringify(
              savedMovies.filter((movie) => {
                return movie.nameRU.includes(searchWords);
              })
            )
          );
          addingNewCards(
            width,
            savedMovies.filter((movie) => {
              return movie.nameRU.includes(searchWords);
            })
          );
        }
      })
      .catch((err) => {
        console.log(`упс, возникла ошибка! ${err}`);
      });
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      // проверим токен
      auth
        .getContent(token)
        .then((res) => {
          console.log(res);
          if (res) {
            setLoggedIn(true);
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("id", res.id);
            setCurrentUser({
              name: res.name,
              email: res.email,
              id: res.id,
            });
          }
        })
        .catch((err) => {
          console.log(`упс, возникла ошибка! ${err}`);
        });
      moviesApi
        .getMovies()
        .then((data) => {})
        .catch((err) => {
          console.log(`упс, возникла ошибка! ${err}`);
        });
      mainApi
        .getMovies()
        .then((data) => {
          localStorage.setItem(
            "savedMovies",
            JSON.stringify(
              data.filter((movie) => movie.owner === localStorage.getItem('id'))
            )
          );
        })
        .catch((err) => {
          console.log(`упс, возникла ошибка! ${err}`);
        });
      // history.push("/movies");
    }
  }

  function authorize(mail, password) {
    auth
      .authorize(mail, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          handleLogin();
          localStorage.setItem("loggedIn", true);
          setCurrentUser({
            name: data.name,
            email: data.email,
            id: data.id,
          });
          history.push("/movies");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function register(name, email, password) {
    auth
      .register(name, email, password)
      .then((data) => {
        if (data) {
          isRegisteredIn(true);
          authorize(email, password);
        }
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
        isRegisteredIn(false);
      });
  }

  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("movies");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
    setCurrentUser({ name: "", email: "", id: "" });
    history.push("/");
  }

  function signUp() {
    history.push("/signin");
  }

  function signIn() {
    history.push("/signup");
  }

  function isButtonClicked(click) {
    if (click === "true") {
      isHeaderButtonClicked(true);
    }
    if (click === "false") {
      isHeaderButtonClicked(false);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main
              route="main"
              loggedIn={loggedIn}
              setRoute={setRoute}
              isButtonClicked={isButtonClicked}
              headerButtonClicked={headerButtonClicked}
            />
          </Route>
          <ProtectedRoute path="/movies"
              component={Movies}
              tokenCheck={tokenCheck}
              setRoute={setRoute}
              isButtonClicked={isButtonClicked}
              headerButtonClicked={headerButtonClicked}
              searchMovies={searchMovies}
              setWords={setSearchWords}
              setDemand={setDemand}
              movies={movies}
              demand={demand}
              searchWords={searchWords}
              buttonClick={onButtonClick}
              array={array}
              array2={array2}
              likeMovie={likeMovie}
              addingNewCards={addingNewCards}
              shortMovies={shortMovies}
              setShortMovies={setShortMovies}
              width={width}
              savedMovies={JSON.parse(localStorage.getItem("savedMovies"))}
              setMovies={setMovies}
              setArray={setArray}
              loggedIn={loggedIn}
              check={check}
              array3={array3}
              trig={trig}
              setTrig={setTrig}
            />
          <ProtectedRoute path="/saved-movies"
              component={SavedMovies}
              tokenCheck={tokenCheck}
              setRoute={setRoute}
              isButtonClicked={isButtonClicked}
              headerButtonClicked={headerButtonClicked}
              searchMovies={searchMovies}
              setWords={setSearchWords}
              setDemand={setDemand}
              movies={movies}
              demand={demand}
              searchWords={searchWords}
              buttonClick={onButtonClick}
              array={array}
              array2={array2}
              likeMovie={likeMovie}
              addingNewCards={addingNewCards}
              shortMovies={shortMovies}
              setShortMovies={setShortMovies}
              width={width}
              savedMovies={JSON.parse(localStorage.getItem("savedMovies"))}
              route={route}
              setMovies={setMovies}
              buttonClick={onButtonClick}
              loggedIn={loggedIn}
              array3={array3}
              trig={trig}
              setTrig={setTrig}
            />
          <ProtectedRoute path="/profile"
              component={Profile}
              isButtonClicked={isButtonClicked}
              setRoute={setRoute}
              route={route}
              validity={validity}
              validateField={validateField}
              updateUser={handleUpdateUser}
              signOut={signOut}
              loggedIn={loggedIn}
            />
          <Route path="/signup">
            <Register
              isButtonClicked={isButtonClicked}
              setRoute={setRoute}
              route="register"
              validity={validity}
              validateField={validateField}
              register={register}
              signUp={signUp}
              registeredIn={registeredIn}
              regError={err}
              setError={setErr}
            />
          </Route>
          <Route path="/signin">
            <Login
              signIn={signIn}
              isButtonClicked={isButtonClicked}
              setRoute={setRoute}
              route="login"
              validity={validity}
              validateField={validateField}
              authorize={authorize}
            />
          </Route>
          <Route path="*">
            <Error404 />
          </Route>
        </Switch>
        {width > 1100 && !headerButtonClicked ? (
          <></>
        ) : (
          <Navigation
            isButtonClicked={isButtonClicked}
            headerButtonClicked={headerButtonClicked}
            route={route}
          />
        )}
        <Preloader loading={loading} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
