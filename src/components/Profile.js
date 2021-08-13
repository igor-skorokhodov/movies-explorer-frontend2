import React from "react";
import FormErrors from "./FormErrors.js";
import Header from "../components/Header.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import InfoToolTip from "./InfoTollTip.js";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    props.setRoute("profile");
    props.setValidity({
      formErrors: { email: "", password: "", name: "" },
      emailValid: true,
      passwordValid: false,
      formValidReg: false,
      formValidLog: false,
      nameValid: false,
    });
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    props.setData(
      {
        ...props.data,
        [name]: value,
      },
      props.validateField(name, value)
    );
  }

  function updateUser(e) {
    e.preventDefault();
    props.updateUser(props.data.name, props.data.email);
    setIsOpen(true);
  }

  function signOut() {
    props.signOut();
  }

  return (
    <section className="profile">
      <InfoToolTip
        isOpen={isOpen}
        setOpen={setIsOpen}
        setError={props.setError}
        route={props.route}
      />
      <Header
        route={props.route}
        isButtonClicked={props.isButtonClicked}
        loggedIn={props.loggedIn}
      />
      <form onSubmit={updateUser} className="profile__container">
        <h1 className="profile__header">{`Привет, ${currentUser.name}!`}</h1>
        <div className="profile__info-container">
          <div className="profile__info profile__info_underline">
            <p className="profile__text profile__text_weight">Имя</p>
            <input
              onChange={handleChange}
              className="profile__text"
              value={props.data.name}
              name="name"
            ></input>
          </div>
          <FormErrors
            formErrors={props.validity.formErrors.name}
            input="name"
            value={props.data.name}
            type="name"
          />
          <div className="profile__info">
            <p className="profile__text profile__text_weight">E-mail</p>
            <input
              onChange={handleChange}
              className="profile__text"
              value={props.data.email}
              name="email"
            ></input>
          </div>
          <FormErrors
            formErrors={props.validity.formErrors.email}
            input="email"
          />
        </div>
        <div className="profile__buttons">
          <button
            disabled={!props.validity.formValidProfile}
            type="submit"
            className={`profile__button ${
              !props.validity.formValidProfile
                ? "profile__button_inactive "
                : " "
            }`}
            onClick={updateUser}
          >
            Редактировать
          </button>
          <button
            onClick={signOut}
            className="profile__button profile__button_red"
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
}

export default Profile;
