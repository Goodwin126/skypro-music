import * as S from "./styles";

// Функция для обрезки строки с добавлением многоточия
const truncateText = (text, maxLength) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export default function TrackPlay({ trakcName, trackAuthor }) {
  const truncatedTrackName = truncateText(trakcName, 5);
  const truncatedTrackAuthor = truncateText(trackAuthor, 5);

  return (
    <S.StyledPlayerTrackPlay>
      <S.StyledTrackPlayContain>
        <S.StyledTrackPlayImage>
          <S.StyledTrackPlaySvg
            width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            alt="music"
          >
            <use href="/img/icon/sprite.svg#icon-note" />
          </S.StyledTrackPlaySvg>
        </S.StyledTrackPlayImage>
        <S.StyledTrackPlayAuthor>
          <S.StyledTrackPlayAuthorLink href="http://">
            {truncatedTrackName}
          </S.StyledTrackPlayAuthorLink>
        </S.StyledTrackPlayAuthor>
        <S.StyledTrackPlayAlbum>
          <S.StyledTrackPlayAlbumLink href="http://">
            {truncatedTrackAuthor}
          </S.StyledTrackPlayAlbumLink>
        </S.StyledTrackPlayAlbum>
      </S.StyledTrackPlayContain>
    </S.StyledPlayerTrackPlay>
  );
}
