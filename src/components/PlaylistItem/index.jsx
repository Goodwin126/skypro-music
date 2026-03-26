import * as S from "./styles";

export default function PlaylistItem({
  trackTitle,
  trackAuthor,
  trackAlbum,
  trackTime,
  trackLike,
  trackSpanContent,
  animate,
  isPlaying,
  sprite,
  onClick,
}) {
  return (
    <S.StyledPlaylistItem>
      <S.StyledPlaylistTrack>
        <S.StyledTrackTitle>
          <S.StyledTrackTitleImage>
            <S.StyledTrackTitleSvg aria-label="Иконка трека">
              <S.StyledAnimatedSvg $animate={animate} $isPlaying={isPlaying}>
                {sprite === "current-track-play" ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z"
                      fill="#B672FF"
                    />
                  </svg>
                ) : (
                  <svg>
                    <use href={sprite} />
                  </svg>
                )}
              </S.StyledAnimatedSvg>
            </S.StyledTrackTitleSvg>
          </S.StyledTrackTitleImage>
          <S.StyledTrackTitleText>
            <S.StyledTrackTitleLink onClick={onClick}>
              {trackTitle}
              <S.StyledTrackTitleSpan>
                {trackSpanContent}
              </S.StyledTrackTitleSpan>
            </S.StyledTrackTitleLink>
          </S.StyledTrackTitleText>
        </S.StyledTrackTitle>
        <S.StyledTrackAuthor>
          <S.StyledTrackAuthorLink href="/">
            {trackAuthor}
          </S.StyledTrackAuthorLink>
        </S.StyledTrackAuthor>
        <S.StyledtrackAlbum>
          <S.StyledTrackAlbumLink href="/">{trackAlbum}</S.StyledTrackAlbumLink>
        </S.StyledtrackAlbum>
        <S.StyledTrackTime>
          <S.StyledTrackTimeSvg alt="time">
            {trackLike ? (
              <use href="/img/icon/sprite.svg#icon-like-press" />
            ) : (
              <use href="/img/icon/sprite.svg#icon-like" />
            )}
          </S.StyledTrackTimeSvg>
          <S.StyledtrackTimeText>{trackTime}</S.StyledtrackTimeText>
        </S.StyledTrackTime>
      </S.StyledPlaylistTrack>
    </S.StyledPlaylistItem>
  );
}
