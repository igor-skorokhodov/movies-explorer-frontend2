import React from "react";
import FormErrors from "./FormErrors.js";
import Header from "../components/Header.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [data, setData] = React.useState({
    name: currentUser.name,
    email: currentUser.email,
  });

  React.useEffect(() => {
    props.setRoute("profile");
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setData(
      {
        ...data,
        [name]: value,
      },
      props.validateField(name, value)
    );
  }


  function updateUser() {
    props.updateUser(data.name, data.email)
  }

  function signOut () {
    props.signOut();
  }

  return (
    <section className="profile">
      <Header route={props.route} isButtonClicked={props.isButtonClicked} loggedIn={props.loggedIn} />
      <form onSubmit={updateUser} className="profile__container">
        <h1 className="profile__header">{`Привет, ${currentUser.name}!`}</h1>
        <div className="profile__info-container">
          <div className="profile__info profile__info_underline">
            <p className="profile__text profile__text_weight">Имя</p>
            <input onChange={handleChange} className="profile__text" value={data.name} name="name"></input>
          </div>
          <FormErrors formErrors={props.validity.formErrors.name} input="name" value={data.name} type="name"/>
          {console.log(data)}
          <div className="profile__info">
            <p className="profile__text profile__text_weight">E-mail</p>
            <input onChange={handleChange} className="profile__text" value={data.email} name="email"></input>
          </div>
          <FormErrors formErrors={props.validity.formErrors.email} input="email" />
        </div>
        <div className="profile__buttons">
          <button type="submit" className="profile__button" onClick={updateUser}>Редактировать</button>
          <button onClick={signOut} className="profile__button profile__button_red">
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </section>
  );
}

export default Profile;
