import * as S from "./styles";

import React from "react";

const { useState } = React;

export default function Navmenu({ onAuthButtonClick }) {
  const [visible, setVisible] = useState();

  const toggleVisibility = () => setVisible(!visible);

  return (
    <S.StyledMainNav>
      <S.StyledNavLogo>
        <S.StyledLogoImage src="/img/logo.png" alt="logo" />
      </S.StyledNavLogo>
      <S.StyledNavBurger onClick={toggleVisibility}>
        <S.StyledBurgerLine />
        <S.StyledBurgerLine />
        <S.StyledBurgerLine />
      </S.StyledNavBurger>
      {visible && (
        <S.StyledNavMenu>
          <S.StyledMenuList>
            <S.StyledMenuItem>
              <S.StyledMenuLink to="/">Главное</S.StyledMenuLink>
            </S.StyledMenuItem>
            <S.StyledMenuItem>
              <S.StyledMenuLink to="/my-playlist">
                Мой плейлист
              </S.StyledMenuLink>
            </S.StyledMenuItem>
            <S.StyledMenuItem>
              <S.StyledMenuLink onClick={onAuthButtonClick}>
                Выйти
              </S.StyledMenuLink>
            </S.StyledMenuItem>
          </S.StyledMenuList>
        </S.StyledNavMenu>
      )}
    </S.StyledMainNav>
  );
}
