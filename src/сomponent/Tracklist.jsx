import { PlaylistItem } from "./playlistItem";
import { SkeletonItem } from "./SkeletonItem";
import { SearchByMenu } from "./SearchByMenu";
import styled from "styled-components";

const StyledMainCenterblock = styled.div`
  width: auto;
  flex-grow: 3;
  padding: 20px 40px 20px 111px;
`;

const StyledCenterblockSearch = styled.div`
  width: 100%;
  border-bottom: 1px solid #4e4e4e;
  margin-bottom: 51px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledSearchText = styled.input`
  flex-grow: 100;
  background-color: transparent;
  border: none;
  padding: 13px 10px 14px;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;

  &::placeholder {
    color: #ffffff;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  }
`;

const StyledSearchSvg = styled.svg`
  width: 17px;
  height: 17px;
  margin-right: 5px;
  stroke: #ffffff;
  fill: transparent;
`;

const StyledCenterblockH2 = styled.h2`
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 72px;
  letter-spacing: -0.8px;
  margin-bottom: 45px;
`;

const StyledCenterblockContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledContentTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const StyledplaylistTitleCol = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 2px;
  color: #696969;
  text-transform: uppercase;
`;

const StyledCol01 = styled(StyledplaylistTitleCol)`
  width: 447px;
`;

const StyledCol02 = styled(StyledplaylistTitleCol)`
  width: 321px;
`;

const StyledCol03 = styled(StyledplaylistTitleCol)`
  width: 245px;
`;

const StyledCol04 = styled(StyledplaylistTitleCol)`
  width: 60px;
  text-align: end;
`;

const StyledplaylistTitleSvg = styled.svg`
  width: 12px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
`;

const StyledContentPlaylist = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export function TrackList({ isLoading, setIndexTrackPlaying, tracks }) {
  return (
    <StyledMainCenterblock>
      <StyledCenterblockSearch>
        <StyledSearchSvg>
          <use href="/img/icon/sprite.svg#icon-search" />
        </StyledSearchSvg>
        <StyledSearchText type="search" placeholder="Поиск" name="search" />
      </StyledCenterblockSearch>
      <StyledCenterblockH2>Треки</StyledCenterblockH2>
      <SearchByMenu />

      <StyledCenterblockContent>
        <StyledContentTitle>
          <StyledCol01>Трек</StyledCol01>
          <StyledCol02>ИСПОЛНИТЕЛЬ</StyledCol02>
          <StyledCol03>АЛЬБОМ</StyledCol03>
          <StyledCol04>
            <StyledplaylistTitleSvg alt="time">
              <use href="/img/icon/sprite.svg#icon-watch" />
            </StyledplaylistTitleSvg>
          </StyledCol04>
        </StyledContentTitle>

        <StyledContentPlaylist>
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <SkeletonItem key={index} />
              ))
            : tracks.map((track, index) => (
                <PlaylistItem
                  key={index}
                  index={index}
                  trackTitle={track.trackTitle}
                  trackSpanContent={track.trackSpanContent}
                  trackAuthor={track.trackAuthor}
                  trackAlbum={track.trackAlbum}
                  trackTime={track.trackTime}
                  sprite="/img/icon/sprite.svg"
                  onClick={() => setIndexTrackPlaying(index)}
                />
              ))}
        </StyledContentPlaylist>
      </StyledCenterblockContent>
    </StyledMainCenterblock>
  );
}
