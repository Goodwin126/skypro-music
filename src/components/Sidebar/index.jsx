import * as S from "./styles";
import SideBarPersonal from "../sideBarPersonal";
import SidebarItem from "../SidebarItem";
import { SidbarSkeliton } from "../SkelitonSidebar";

export default function Sidebar({ isLoading, onAuthButtonClick }) {
  return (
    <S.StyledMainSidebar>
      <SideBarPersonal
        sprite="/img/icon/sprite.svg"
        onAuthButtonClick={onAuthButtonClick}
      />

      <S.StyledSidebarBlock>
        <S.StyledSidebarList>
          {isLoading ? (
            <SidbarSkeliton />
          ) : (
            <>
              <SidebarItem playlist="/img/playlist01.png" id="1" />
              <SidebarItem playlist="/img/playlist02.png" id="2" />
              <SidebarItem playlist="/img/playlist03.png" id="3" />
            </>
          )}
        </S.StyledSidebarList>
      </S.StyledSidebarBlock>
    </S.StyledMainSidebar>
  );
}
