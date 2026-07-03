import React from 'react';
import * as S from './styles.js';

import Navmenu from '../NavMenu';

export default function PageLayout({ isLoading, Playlist, Sidebar }) {
  return (
    <S.StyledContainer>
      <S.StyledMain>
        <Navmenu />
        <Playlist isLoading={isLoading} />
        {Sidebar && <Sidebar isLoading={isLoading} />}
      </S.StyledMain>
      <footer className="footer"></footer>
    </S.StyledContainer>
  );
}
