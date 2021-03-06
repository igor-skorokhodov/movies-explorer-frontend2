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
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login.js";
import Register from "./Register.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from "../utils/auth.js";
import Preloader from "./Preloader";
import { findAllInRenderedTree } from "react-dom/cjs/react-dom-test-utils.production.min";

function App() {
  const [headerButtonClicked, isHeaderButtonClicked] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    email: "",
    id: "",
  });
  const [demand, setDemand] = React.useState("");
  const [searchWords, setSearchWords] = React.useState("");
  const [check, setCheck] = React.useState("");
  const [movies, setMovies] = React.useState([]);
  const [allMovies, setAllMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [shortMovies, setShortMovies] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [updated, setUpdated] = React.useState(false);
  const [loading, isLoading] = React.useState(false);
  const [open, isOpen] = React.useState(false);
  const [width, setWidth] = React.useState(0);
  const [array, setArray] = React.useState([]);
  const [array2, setArray2] = React.useState([]);
  const [array3, setArray3] = React.useState([]);
  const [err, setErr] = React.useState(false);
  const history = useHistory();
  const [registeredIn, isRegisteredIn] = React.useState(false);
  const [route, setRoute] = React.useState("");
  const [trig, setTrig] = React.useState(0);
  const [data, setData] = React.useState({
    name: "",
    email: "",
  });
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
    setWidth(window.innerWidth);
    window.addEventListener(`resize`, () => {
      setWidth(window.innerWidth);
      if (localStorage.getItem("route") === "movies") {
        addingNewCards(
          window.innerWidth,
          JSON.parse(localStorage.getItem("movies"))
        );
      }
      if (localStorage.getItem("route") === "savedMovies") {
        addingNewCards(
          window.innerWidth,
          savedMovies)
      }
    });
  }, []);

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
    console.log(allMovies);
    if (
      allMovies.filter((movie) => {
        return movie.nameRU.includes(searchWords);
      }).length === 0
    ) {
      if (allMovies.length === 0) {
        isOpen(false);
      } else {
        isOpen(true);
      }
      setMovies(
        allMovies.filter((movie) => {
          movie.nameRU.includes(searchWords);
        })
      );
      setMovies(movies);
      if (allMovies.length !== 0) {
        localStorage.setItem(
          "movies",
          JSON.stringify(
            allMovies.filter((movie) => {
              return movie.nameRU.includes(searchWords);
            })
          )
        );
      }
      let arr = JSON.parse(localStorage.getItem("movies"));
      addingNewCards(width, arr);
      if (route === "savedMovies") {
        setMovies(
          savedMovies.filter((movie) => {
            return movie.nameRU.includes(searchWords);
          })
        );
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
    } else {
      isOpen(false);
      setMovies(
        allMovies.filter((movie) => {
          movie.nameRU.includes(searchWords);
        })
      );
      setMovies(movies);
      if (allMovies.length !== 0) {
        localStorage.setItem(
          "movies",
          JSON.stringify(
            allMovies.filter((movie) => {
              return movie.nameRU.includes(searchWords);
            })
          )
        );
      }
      let arr = JSON.parse(localStorage.getItem("movies"));
      addingNewCards(width, arr);
      if (route === "savedMovies") {
        setMovies(
          savedMovies.filter((movie) => {
            return movie.nameRU.includes(searchWords);
          })
        );
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
    }
  }, [allMovies, searchWords]);

  React.useEffect(() => {
    setData({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser]);

  React.useEffect(() => {
    mainApi
      .getMovies()
      .then((movies1) => {
        setArray3(
          movies1.filter((movie) => movie.owner === localStorage.getItem("id"))
        );
        localStorage.setItem(
          "savedMovies",
          JSON.stringify(
            movies1.filter(
              (movie) => movie.owner === localStorage.getItem("id")
            )
          )
        );
      })
      .catch((err) => {
        console.log(`??????, ???????????????? ????????????! ${err}`);
      });
  }, [check]);

  function onButtonClick() {
    if (array2.columns >= 2) {
      if (array2.rounds > 4) {
        let j = 0;
        j = array2.index;
        let arr = [];
        let m = array2.columns;
        for (let i = 0; i < array2.columns; i++) {
          arr[i] = movies[j + m];
          console.log(movies[j + m]);
          m--;
          setArray2({
            index: array2.index++,
            rounds: array2.rounds,
            columns: array2.columns,
          });
        }
        setArray(array.concat(arr));
        setArray2({
          index: array2.index,
          rounds: array2.rounds--,
          columns: array2.columns,
        });
      }
    }
    if (array2.columns === 1) {
      if (array2.rounds > 4) {
        let j = 0;
        for (let i = 0; i < array2.columns + 1; i++) {
          j = array2.index;
          setArray2({
            index: array2.index + array2.columns + 1,
            rounds: array2.rounds - 1,
            columns: array2.columns,
          });
          setArray([movies[j + 1], movies[j], ...array]);
        }
      }
    }
  }

  function addingNewCards(width, arr) {
    console.log(arr)
    if (arr === null) {
      setArray([]);
      return;
    }
    let containerWidth = 0;
    let gapWidth = 0;
    let cardWidth = 364;
    let gap = 24;
    if (width >= 1280) {
      containerWidth = width * 0.91;
    }
    if (width >= 768 && width < 1280) {
      containerWidth = width * 0.92;
    }
    if (width >= 320 && width < 768) {
      containerWidth = width * 0.94;
    }
    gapWidth = (Math.trunc(containerWidth / cardWidth) - 1) * gap;
    columns = Math.trunc((containerWidth - gapWidth) / cardWidth);
    rounds = Math.trunc(arr.length / columns);
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
        const letters = /^[A-Za-z??-????-???? -]+$/;

        if (value.length <= 2) {
          nameValid = value.length <= 2;
          fieldValidationErrors.name = nameValid ? "?????? ?????????????? ????????????????" : "";
        }
        if (value.length >= 30) {
          nameValid = value.length >= 30;
          fieldValidationErrors.name = nameValid ? "?????? ?????????????? ??????????????" : "";
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
              "?????? ???????????? ?????????????????? ???????????? ????????????????, ????????????????, ???????????? ?? ??????????";
          }
        }
        break;
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid
          ? ""
          : "?????????????? ?????????? ??????????????????";
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
          : "???????????? ???????????? ????????????????";
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
      formValidReg: emailValid && passwordValid && !nameValid,
      formValidLog: emailValid && passwordValid,
      formValidProfile: emailValid && !nameValid,
    });
  }

  function likeMovie(movie) {
    console.log(localStorage.getItem("id"))
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
            setCheck(res);
          })
          .catch((err) => {
            console.log(`??????, ???????????????? ????????????! ${err}`);
          });
      }
    });
    if (i === 0 && j === 0) {
      j = 1;
      mainApi
        .addMovie(movie, localStorage.getItem("id"))
        .then((res) => {
          setCheck(res);
        })
        .catch((err) => {
          console.log(`??????, ???????????????? ????????????! ${err}`);
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
        setUpdated(true);
      })
      .catch((err) => {
        console.log(`??????, ???????????????? ????????????! ${err}`);
      });
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function searchMovies() {
    if (allMovies.length === 0) {
      isOpen(false);
      isLoading(true);
      moviesApi
        .getMovies()
        .then((moviesList) => {
          isLoading(false);
          setAllMovies(moviesList);
        })
        .catch((err) => {
          console.log(`??????, ???????????????? ????????????! ${err}`);
        });
    }
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      // ???????????????? ??????????
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
          console.log(`??????, ???????????????? ????????????! ${err}`);
        });
      mainApi
        .getMovies()
        .then((data) => {
          localStorage.setItem(
            "savedMovies",
            JSON.stringify(
              data.filter((movie) => movie.owner === localStorage.getItem("id"))
            )
          );
        })
        .catch((err) => {
          console.log(`??????, ???????????????? ????????????! ${err}`);
        });
    }
  }

  function authorize(mail, password) {
    auth
      .authorize(mail, password)
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem("token", data.token);
          handleLogin();
          localStorage.setItem("loggedIn", true);
          setCurrentUser({
            name: data.name,
            email: data.email,
            id: data.id,
          });
          let arr = [];
          localStorage.setItem("id", data.id);
          localStorage.setItem("savedMovies", JSON.stringify(arr));
          localStorage.setItem("movies", JSON.stringify(arr));
          history.push("/movies");
        }
        mainApi
        .getMovies()
        .then((data) => {
          localStorage.setItem(
            "savedMovies",
            JSON.stringify(
              data.filter((movie) => movie.owner === localStorage.getItem("id")))
          );
        })
        .catch((err) => {
          console.log(`??????, ???????????????? ????????????! ${err}`);
        });
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
    localStorage.removeItem("route");
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
              route={route}
              loggedIn={loggedIn}
              setRoute={setRoute}
              isButtonClicked={isButtonClicked}
              headerButtonClicked={headerButtonClicked}
            />
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            tokenCheck={tokenCheck}
            setRoute={setRoute}
            route={route}
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
            setOpen={isOpen}
            open={open}
            setError={setErr}
          />
          <ProtectedRoute
            path="/saved-movies"
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
            setOpen={isOpen}
            open={open}
            setError={setErr}
          />
          <ProtectedRoute
            path="/profile"
            component={Profile}
            isButtonClicked={isButtonClicked}
            setRoute={setRoute}
            route={route}
            validity={validity}
            validateField={validateField}
            updateUser={handleUpdateUser}
            signOut={signOut}
            loggedIn={loggedIn}
            validity={validity}
            setValidity={setValidity}
            data={data}
            setData={setData}
            updated={updated}
            setError={setErr}
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
