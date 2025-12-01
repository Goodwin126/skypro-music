import { SideBarPersonal } from "./sideBarPersonal";
import { SidebarItem } from "./sidebarItem";
import { SidbarSkeliton } from "./SkelitonSidebar";
import styled from "styled-components";

const StyledMainSidebar = styled.div`
  max-width: 418px;
  padding: 20px 90px 20px 78px;
`;

const StyledSidebarBlock = styled.div`
  height: 100%;
  padding: 240px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const StyledSidebarList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export function Sidebar({ isLoading }) {
  return (
    <StyledMainSidebar>
      <SideBarPersonal sprite="/img/icon/sprite.svg" />

      <StyledSidebarBlock>
        <StyledSidebarList>
          {isLoading ? (
            <SidbarSkeliton />
          ) : (
            <>
              <SidebarItem playlist="/img/playlist01.png" id="1" />
              <SidebarItem playlist="/img/playlist02.png" id="2" />
              <SidebarItem playlist="/img/playlist03.png" id="3" />
            </>
          )}
        </StyledSidebarList>
      </StyledSidebarBlock>
    </StyledMainSidebar>
  );
}
