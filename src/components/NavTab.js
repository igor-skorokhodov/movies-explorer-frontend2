function NavTab(props) {
  return (
    <section className="navtab">
      <a className="navtab__button" href={`#${props.project}`}>О проекте</a>
      <a className="navtab__button" href={`#${props.tech}`}>Технологии</a>
      <a className="navtab__button" href={`#${props.student}`}>Студент</a>
    </section>
  );
}

export default NavTab;
