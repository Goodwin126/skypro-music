import { Link } from "react-router-dom";
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

export const StyledSidebarLink = styled(Link)`
  width: 100%;
  height: 100%;
`;
