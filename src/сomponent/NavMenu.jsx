import React from "react";
const { useState } = React;

export function Navmenu() {
  const [visible, setVisible] = useState();

  const toggleVisibility = () => setVisible(!visible);

  return (
    <nav className="main__nav nav">
      <div className="nav__logo logo">
        <img className="logo__image" src={"/img/logo.png"} alt="logo" />
      </div>
      <div onClick={toggleVisibility} className="nav__burger burger">
        <span className="burger__line"></span>
        <span className="burger__line"></span>
        <span className="burger__line"></span>
      </div>
      {visible && (
        <div className="nav__menu menu">
          <ul className="menu__list">
            <li className="menu__item">
              <a href="#section" className="menu__link">
                Главное
              </a>
            </li>
            <li className="menu__item">
              <a href="#section" className="menu__link">
                Мой плейлист
              </a>
            </li>
            <li className="menu__item">
              <a href="../signin.html" className="menu__link">
                Войти
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
