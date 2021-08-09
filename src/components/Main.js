import React from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Promo from "../components/Promo.js";
import NavTab from "../components/NavTab.js";
import AboutProject from "../components/AboutProject.js";
import Techs from "../components/Techs.js";
import AboutMe from "../components/AboutMe.js";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";

function Main(props) {
  React.useEffect(() => {
    props.setRoute("main");
  }, []);

  const project = "project";
  const tech = "tech";
  const student = "student";

  return (
    <>
      <Header
        route="main"
        signUp={props.signUp}
        signIn={props.signIn}
        email={props.email}
        loggedIn={props.loggedIn}
        name="Выйти"
        isButtonClicked={props.isButtonClicked}
        headerButtonClicked={props.headerButtonClicked}
      />
      <main className="content">
        <Promo />
        <NavTab project={project} tech={tech} student={student} />
        <AboutProject />
        <Techs />
        <AboutMe />
      </main>
      <Footer />
    </>
  );
}

export default Main;
