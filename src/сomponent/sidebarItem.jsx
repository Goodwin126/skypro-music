import styled from "styled-components";

export const StyledSidebarItem = styled.div`
  width: 250px;
  height: 150px;

  &:not(:last-child) {
    margin-bottom: 30px;
  }
`;

export const StyledSidebarImg = styled.img`
  width: 100%;
  height: auto;
`;

const StyledSidebarLink = styled.a`
  width: 100%;
  height: 100%;
`;

export function SidebarItem({ playlist, link }) {
  return (
    <StyledSidebarItem>
      <StyledSidebarLink href={link}>
        <StyledSidebarImg src={playlist} alt="day's playlist" />
      </StyledSidebarLink>
    </StyledSidebarItem>
  );
}
