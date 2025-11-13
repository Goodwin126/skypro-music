import styled from "styled-components";

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
  padding: 16px;
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

export function PlaylistItem({
  trackTitle,
  trackAuthor,
  trackAlbum,
  trackTime,
  trackSpanContent,
  sprite,
}) {
  return (
    <StyledPlaylistItem>
      <StyledPlaylistTrack>
        <StyledTrackTitle>
          <StyledTrackTitleImage>
            <StyledTrackTitleSvg alt="music">
              <use href="/img/icon/sprite.svg#icon-note"></use>
            </StyledTrackTitleSvg>
          </StyledTrackTitleImage>
          <StyledTrackTitleText>
            <StyledTrackTitleLink href="http://">
              {trackTitle}
              <StyledTrackTitleSpan>{trackSpanContent}</StyledTrackTitleSpan>
            </StyledTrackTitleLink>
          </StyledTrackTitleText>
        </StyledTrackTitle>
        <StyledTrackAuthor>
          <StyledTrackAuthorLink href="http://">
            {trackAuthor}
          </StyledTrackAuthorLink>
        </StyledTrackAuthor>
        <StyledtrackAlbum>
          <StyledTrackAlbumLink href="http://">
            {trackAlbum}
          </StyledTrackAlbumLink>
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
