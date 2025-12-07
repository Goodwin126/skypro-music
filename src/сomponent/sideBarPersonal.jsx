import styled from "styled-components";
const StyledSidebarPersonalt = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 12px 0 15px 0;
`;
const StyledSidebarPersonalName = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin-right: 16px;
`;
const StyledSidebarIcon = styled.div`
  width: 42px;
  height: 42px;
  background-color: #313131;
  border-radius: 50%;
  cursor: pointer;
`;
export function SideBarPersonal({ sprite, onAuthButtonClick }) {
  return (
    <StyledSidebarPersonalt onClick={onAuthButtonClick}>
      {" "}
      <StyledSidebarPersonalName>Sergey.Ivanov</StyledSidebarPersonalName>{" "}
      <StyledSidebarIcon>
        {" "}
        <svg xmlns="http://www.w3.org/2000/svg" alt="logout">
          {" "}
          <use href={`${sprite}#logout`} />{" "}
        </svg>{" "}
      </StyledSidebarIcon>{" "}
    </StyledSidebarPersonalt>
  );
}
