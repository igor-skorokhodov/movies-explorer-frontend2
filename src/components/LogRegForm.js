import { Link } from "react-router-dom";
import {useHistory} from "react-router-dom";

function LogRegForm(props) {
  const history = useHistory();

  function redirectToMain() {
    history.push("/");
  }

  return (
    <div className="logreg">
      <div className="logreg__container">
        <button className="logreg__logo" onClick={redirectToMain}></button>
        <h1 className="logreg__header">{props.route === "register" ? "Добро пожаловать!" : "Рады видеть!"}</h1>
        <form
          onSubmit={props.submit}
          className="logreg__form"
          name="logreg__form"
          id="logreg__form"
          noValidate
          method="POST"
        >
          {props.children}
          <button
            type="submit"
            className={`logreg__button ${!props.formValid ? "logreg__button_inactive " : " "}${props.route === "login" ? "logreg__button_margin" : ""}`}
            id={props.idButton}
            aria-label={props.ariaLabel}
            disabled={!props.formValid}
          >
            {props.buttonText}
          </button>
        </form>
        <div className="logreg__link-container">
          <p className="logreg__link logreg__link_grey">
            {props.route === "register"
              ? "Уже зарегистрированы?"
              : props.route === "login"
              ? "Еще не зарегистрированы?"
              : ""}
          </p>
          <Link to={props.route === "register"
              ? "/signin"
              : props.route === "login"
              ? "/signup"
              : ""} className="logreg__link logreg__link_green">
          {props.route === "register"
              ? "Войти"
              : props.route === "login"
              ? "Регистрация"
              : ""}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LogRegForm;
