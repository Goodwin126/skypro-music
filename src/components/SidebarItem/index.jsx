import * as S from "./styles";

export default function SidebarItem({ playlist, id }) {
  return (
    <S.StyledSidebarItem>
      <S.StyledSidebarLink to={`/collections/${id}`}>
        <S.StyledSidebarImg src={playlist} alt="day's playlist" />
      </S.StyledSidebarLink>
    </S.StyledSidebarItem>
  );
}
