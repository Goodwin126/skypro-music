import * as S from "./styles.js";

import Navmenu from "../NavMenu";

export default function PageLayout({
  onAuthButtonClick,
  isLoading,
  Playlist,
  Sidebar,
}) {
  return (
    <S.StyledContainer>
      <S.StyledMain>
        <Navmenu onAuthButtonClick={onAuthButtonClick} />
        <Playlist isLoading={isLoading} />
        {Sidebar && (
          <Sidebar
            isLoading={isLoading}
            onAuthButtonClick={onAuthButtonClick}
          />
        )}
      </S.StyledMain>
      <footer className="footer"></footer>
    </S.StyledContainer>
  );
}
