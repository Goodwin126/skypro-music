import * as S from "./styles";
import SideBarPersonal from "../sideBarPersonal";
import SidebarItem from "../SidebarItem";
import SidbarSkeliton from "../SkelitonSidebar";

export default function Sidebar({ isLoading, onAuthButtonClick }) {
  return (
    <S.StyledMainSidebar role="region" aria-label="Main sidebar">
      <SideBarPersonal
        sprite="/img/icon/sprite.svg"
        onAuthButtonClick={onAuthButtonClick}
      />

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
