import * as S from "./styles";

export default function SideBarPersonal({ sprite, onAuthButtonClick }) {
  return (
    <S.StyledSidebarPersonalt onClick={onAuthButtonClick}>
      {" "}
      <S.StyledSidebarPersonalName>
        Sergey.Ivanov
      </S.StyledSidebarPersonalName>{" "}
      <S.StyledSidebarIcon>
        {" "}
        <svg xmlns="http://www.w3.org/2000/svg" alt="logout">
          {" "}
          <use href={`${sprite}#logout`} />{" "}
        </svg>{" "}
      </S.StyledSidebarIcon>{" "}
    </S.StyledSidebarPersonalt>
  );
}
