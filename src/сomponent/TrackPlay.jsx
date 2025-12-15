import styled from "styled-components";

export const StyledPlayerTrackPlay = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StyledTrackPlayContain = styled.div`
  width: auto;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas:
    "image author"
    "image album";
  align-items: center;
`;

export const StyledTrackPlayImage = styled.div`
  width: 51px;
  height: 51px;
  background-color: #313131;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  grid-row: 1;
  grid-column: 1;
  grid-area: image;
`;

export const StyledTrackPlaySvg = styled.svg`
  width: 18px;
  height: 17px;
  fill: transparent;
  stroke: #4e4e4e;
`;

export const StyledTrackPlayAuthor = styled.div`
  grid-row: 1;
  grid-column: 2;
  grid-area: author;
  min-width: 49px;
`;

export const StyledTrackPlayAlbum = styled.div`
  grid-row: 2;
  grid-column: 2;
  grid-area: album;
  min-width: 49px;
`;

const StyledTrackPlayAuthorLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  white-space: nowrap;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledTrackPlayAlbumLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  color: #ffffff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// Функция для обрезки строки с добавлением многоточия
const truncateText = (text, maxLength) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export function TrackPlay({ trakcName, trackAuthor }) {
  const truncatedTrackName = truncateText(trakcName, 5);
  const truncatedTrackAuthor = truncateText(trackAuthor, 5);

  return (
    <StyledPlayerTrackPlay>
      <StyledTrackPlayContain>
        <StyledTrackPlayImage>
          <StyledTrackPlaySvg
            width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            alt="music"
          >
            <use href="/img/icon/sprite.svg#icon-note" />
          </StyledTrackPlaySvg>
        </StyledTrackPlayImage>
        <StyledTrackPlayAuthor>
          <StyledTrackPlayAuthorLink href="http://">
            {truncatedTrackName}
          </StyledTrackPlayAuthorLink>
        </StyledTrackPlayAuthor>
        <StyledTrackPlayAlbum>
          <StyledTrackPlayAlbumLink href="http://">
            {truncatedTrackAuthor}
          </StyledTrackPlayAlbumLink>
        </StyledTrackPlayAlbum>
      </StyledTrackPlayContain>
    </StyledPlayerTrackPlay>
  );
}
