import { StyledSidebarItem, StyledSidebarImg } from "./sidebarItem";

export function SidbarSkeliton() {
  return (
    <div>
      <StyledSidebarItem>
        <StyledSidebarImg
          alt="square"
          src="/img/skelitons/Skeleton_rectangle05.svg"
        />
      </StyledSidebarItem>
      <StyledSidebarItem>
        <StyledSidebarImg
          alt="square"
          src="/img/skelitons/Skeleton_rectangle05.svg"
        />
      </StyledSidebarItem>
      <StyledSidebarItem>
        <StyledSidebarImg
          alt="square"
          src="/img/skelitons/Skeleton_rectangle05.svg"
        />
      </StyledSidebarItem>
    </div>
  );
}
