import React from 'react';
import { Link } from 'react-router-dom';

import * as S from './styles';
import { useAuth } from '../../context/AuthContext'; // Путь проверь! Может быть ../context/AuthContext

export default function SideBarPersonal({ sprite }) {
  const { user, logout } = useAuth();
  return (
    <>
      {user ? (
        <S.StyledSidebarPersonalt onClick={logout}>
          {' '}
          <S.StyledSidebarPersonalName>
            {user.username}
          </S.StyledSidebarPersonalName>{' '}
          <S.StyledSidebarIcon>
            {' '}
            <svg xmlns="http://www.w3.org/2000/svg" aria-label="logout">
              {' '}
              <use href={`${sprite}#logout`} />{' '}
            </svg>{' '}
          </S.StyledSidebarIcon>{' '}
        </S.StyledSidebarPersonalt>
      ) : (
        <Link to="/login">
          <S.StyledSidebarPersonalt onClick={logout}>
            {' '}
            <S.StyledSidebarPersonalName></S.StyledSidebarPersonalName>{' '}
            <S.StyledSidebarIcon>
              {' '}
              <svg xmlns="http://www.w3.org/2000/svg" aria-label="logout">
                {' '}
                <use href={`${sprite}#logout`} />{' '}
              </svg>{' '}
            </S.StyledSidebarIcon>{' '}
          </S.StyledSidebarPersonalt>
        </Link>
      )}
    </>
  );
}
