import React from 'react';
import { Link } from 'react-router-dom'; // Нужен для кнопки "Войти"
import * as S from './styles';
import { useAuth } from '../../context/AuthContext';

const { useState } = React;

export default function Navmenu() {
  const [visible, setVisible] = useState(false); // Лучше сразу задать false, а не undefined
  const { user, logout } = useAuth(); // Получаем данные из контекста

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

            {/* ✅ ГЛАВНОЕ ИЗМЕНЕНИЕ: Условный рендер кнопки */}
            {user ? (
              // Если пользователь есть -> показываем "Выйти"
              <S.StyledMenuItem>
                <S.StyledMenuLink
                  onClick={(e) => {
                    e.preventDefault(); // Важно: предотвращаем переход по ссылке, если это кнопка
                    logout();
                  }}
                >
                  Выйти
                </S.StyledMenuLink>
              </S.StyledMenuItem>
            ) : (
              // Если пользователя нет -> показываем "Войти"
              <S.StyledMenuItem>
                <Link
                  to="/login"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Войти
                </Link>
              </S.StyledMenuItem>
            )}
          </S.StyledMenuList>
        </S.StyledNavMenu>
      )}
    </S.StyledMainNav>
  );
}
