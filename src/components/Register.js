import LogRegForm from "./LogRegForm.js";
import FormErrors from "./FormErrors.js";
import React from "react";
import InfoToolTip from "./InfoTollTip.js";

function Register(props) {
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const [isOpen, setIsOpen] = React.useState(false);

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

  function handleSubmit(e) {
    e.preventDefault();
    setIsOpen(true);
    props.register(data.name, data.email, data.password);
  }

  return (
    <>
      <InfoToolTip
        isOpen={isOpen}
        setOpen={setIsOpen}
        registeredIn={props.registeredIn}
        regError={props.regError}
        setError={props.setError}
      />
      <LogRegForm
        className="logreg__container"
        title="Регистрация"
        buttonText="Зарегистрироваться"
        submit={handleSubmit}
        formValid={props.validity.formValidReg}
        route={props.route}
      >
        <p className="logreg__form-name">Имя</p>
        <input
          onChange={handleChange}
          value={data.name}
          className="logreg__input"
          type="name"
          name="name"
          id="logreg__input_name"
          required
        />
        <FormErrors formErrors={props.validity.formErrors.name} input="name" />
        <p className="logreg__form-name">E-mail</p>
        <input
          onChange={handleChange}
          value={data.email}
          className="logreg__input"
          type="email"
          name="email"
          id="logreg__input_email"
          required
        />
        <FormErrors formErrors={props.validity.formErrors.email} input="name" />
        <p className="logreg__form-name">Пароль</p>
        <input
          onChange={handleChange}
          value={data.password}
          className="logreg__input"
          type="password"
          name="password"
          id="logreg__input_password"
          required
        />
        <FormErrors formErrors={props.validity.formErrors.password} input="name" />
      </LogRegForm>

    </>
  );
}

export default Register;
