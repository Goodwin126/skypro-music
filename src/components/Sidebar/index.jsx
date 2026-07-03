import React from 'react';
import * as S from './styles';
import SideBarPersonal from '../sideBarPersonal';
import SidebarItem from '../SidebarItem';
import SidbarSkeliton from '../SkelitonSidebar';

// ❌ УБРАЛИ onAuthButtonClick из аргументов
export default function Sidebar({ isLoading }) {
  return (
    <S.StyledMainSidebar role="region" aria-label="Main sidebar">
      {/* ❌ УБРАЛИ передачу onAuthButtonClick сюда */}
      <SideBarPersonal sprite="/img/icon/sprite.svg" />

      <S.StyledSidebarBlock role="region" aria-label="sidebar block">
        <S.StyledSidebarList>
          {isLoading ? (
            <SidbarSkeliton />
          ) : (
            <div>
              <SidebarItem playlist="/img/playlist01.png" id="Плейлист дня" />
              <SidebarItem
                playlist="/img/playlist02.png"
                id="100 танцевальных хитов"
              />
              <SidebarItem playlist="/img/playlist03.png" id="Инди-заряд" />
            </div>
          )}
        </S.StyledSidebarList>
      </S.StyledSidebarBlock>
    </S.StyledMainSidebar>
  );
}
