import React from "react";
import ok from "../images/galka.svg";
import error from "../images/krestik.svg";
import { useHistory } from "react-router-dom";

function InfoToolTip(props) {

  const history = useHistory();

  function closeInfoToolTip() {
    props.setOpen(false);
    props.setError(false);
  }

  React.useEffect(() => {
    function handleClick(evt) {
      if (evt.target.classList.contains("infotooltip_active")) {
        props.setOpen(false);
        props.setError(false);
        if (props.registeredIn) {
          history.push("/movies");
        }
      }
    }

    function handleOnKeyDown(evt) {
      if (evt.key === "Escape") {
        props.setOpen(false);
        props.setError(false);
        if (props.registeredIn) {
          history.push("/movies");
        }
      }
    }

    document.addEventListener("keydown", handleOnKeyDown);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("keydown", handleOnKeyDown);
      document.removeEventListener("click", handleClick);
    };
  });

  return (
    <div className={`infotooltip ${props.isOpen ? "infotooltip_active" : ""}`}>
      <div className="infotooltip__container">
        <button
          className="popup__close-button popup__close-button_position-tool"
          onClick={closeInfoToolTip}
          type="button"
          aria-label="Закрыть окно"
          id="close_button_edit"
        ></button>
        <img
          className="infotooltip__pic"
          src={props.registeredIn && !props.regError ? ok : error}
          alt={
            (props.registeredIn
              ? "регистрация прошла успешно"
              : "что-то пошло не так, регистрация не прошла")
              &&
              (props.regError
                ? "регистрация прошла успешно"
                : "такой пользователь уже существует")
          }
        ></img>
        {console.log(props.registeredIn)}
        <p className="infotooltip__text">
          {(props.regError
            ? "такой пользователь уже существует"
            : props.registeredIn ? "регистрация прошла успешно" : "что-то пошло не так, попробуйте еще раз")}
        </p>
      </div>
    </div>
  );
}

export default InfoToolTip;
