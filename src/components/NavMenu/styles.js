import styled from "styled-components";
import { Link } from "react-router-dom";

export const StyledMainNav = styled.nav`
  width: 244px;
  background-color: #181818;
  padding: 20px 0 20px 36px;
`;

export const StyledNavLogo = styled.div`
  width: 113.33px;
  height: 43px;
  padding: 13px 0;
  background-color: transparent;
  margin-bottom: 20px;
`;

export const StyledLogoImage = styled.img`
  width: 113.33px;
  height: 17px;
  color: #181818;
`;

export const StyledNavBurger = styled.div`
  width: 20px;
  gap: 5px;
  padding: 13px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledBurgerLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 1px;
  background-color: #d3d3d3;
`;

export const StyledNavMenu = styled.div`
  display: block;
  visibility: visible;
`;

export const StyledMenuList = styled.ul`
  padding: 18px 0 10px 0;
`;

export const StyledMenuItem = styled.li`
  padding: 5px 0;
  margin-bottom: 16px;
`;

export const StyledMenuLink = styled(Link)`
  color: #ffffff;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;
