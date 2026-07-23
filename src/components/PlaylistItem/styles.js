import { styled } from 'styled-components';

export const StyledPlaylistItem = styled.div`
  width: 100%;
  display: block;
  margin-bottom: 12px;
  overflow: visible;
`;

export const StyledPlaylistTrack = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* Тоже важно для цепочки позиционирования */
  overflow: visible;
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
  border-radius: 4px;
  overflow: visible;
`;

export const StyledTrackTitleSvg = styled.svg`
  display: block;
  width: 18px;
  height: 17px;
  margin: 0 auto;
  overflow: visible;
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

export const StyledTrackTitleLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  text-decoration: none;
`;

export const StyledTrackAlbumLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #696969;
  text-decoration: none;
`;

export const StyledTrackTitleSpan = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #4e4e4e;
`;

export const StyledTrackAuthorLink = styled.a`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  text-align: left;
  text-decoration: none;
`;

export const StyledTrackTimeSvg = styled.svg`
  width: 14px;
  height: 12px;
  align-self: center;
  fill: transparent;
  stroke: #696969;
  margin-right: 17px;

  &:hover {
    stroke: #acacac;
  }

  overflow: visible;
`;

export const StyledtrackTimeText = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: right;
  color: #696969;
`;

export const StyledTrackTime = styled.div`
  display: flex;
  overflow: visible;
`;
