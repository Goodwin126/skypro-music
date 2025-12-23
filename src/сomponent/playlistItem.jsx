import { styled, keyframes, css } from "styled-components";

export const StyledPlaylistItem = styled.div`
  width: 100%;
  display: block;
  margin-bottom: 12px;
`;

export const StyledPlaylistTrack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StyledTrackTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 447px;
`;

export const StyledTrackTitleImage = styled.div`
  width: 51px;
  height: 51px;
  background: #313131;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 17px;
`;

export const StyledTrackTitleSvg = styled.svg`
  width: 18px;
  height: 17px;
  fill: transparent;
  stroke: #4e4e4e;
`;

export const StyledTrackTitleText = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
`;

export const StyledTrackAuthor = styled.div`
  width: 321px;
  display: flex;
  justify-content: flex-start;
`;

export const StyledtrackAlbum = styled.div`
  width: 245px;
`;

const StyledTrackTitleLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
`;

const StyledTrackAlbumLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #696969;
`;

const StyledTrackTitleSpan = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #4e4e4e;
`;

const StyledTrackAuthorLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  text-align: left;
`;

const StyledTrackTimeSvg = styled.svg`
  width: 14px;
  height: 12px;
  margin-right: 17px;
  fill: transparent;
  stroke: #696969;
`;

const StyledtrackTimeText = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: #696969;
`;

const pulseAnimation = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const StyledAnimatedSvg = styled.svg`
  width: 12px;
  height: 12px;
  fill: transparent;

  ${(props) =>
    props.animate &&
    css`
      animation: ${pulseAnimation} 1.5s infinite;
    `}
`;

export function PlaylistItem({
  index,
  trackTitle,
  trackAuthor,
  trackAlbum,
  trackTime,
  trackSpanContent,
  animate,
  sprite,
  onClick,
}) {
  return (
    <StyledPlaylistItem>
      <StyledPlaylistTrack>
        <StyledTrackTitle>
          <StyledTrackTitleImage>
            <StyledTrackTitleSvg alt="music">
              <StyledAnimatedSvg animate={animate}>
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
              </StyledAnimatedSvg>
            </StyledTrackTitleSvg>
          </StyledTrackTitleImage>
          <StyledTrackTitleText>
            <StyledTrackTitleLink onClick={onClick}>
              {trackTitle}
              <StyledTrackTitleSpan>{trackSpanContent}</StyledTrackTitleSpan>
            </StyledTrackTitleLink>
          </StyledTrackTitleText>
        </StyledTrackTitle>
        <StyledTrackAuthor>
          <StyledTrackAuthorLink href="/">{trackAuthor}</StyledTrackAuthorLink>
        </StyledTrackAuthor>
        <StyledtrackAlbum>
          <StyledTrackAlbumLink href="/">{trackAlbum}</StyledTrackAlbumLink>
        </StyledtrackAlbum>
        <div className="track__time">
          <StyledTrackTimeSvg alt="time">
            <use href="/img/icon/sprite.svg#icon-like"></use>
          </StyledTrackTimeSvg>
          <StyledtrackTimeText>{trackTime}</StyledtrackTimeText>
        </div>
      </StyledPlaylistTrack>
    </StyledPlaylistItem>
  );
}
