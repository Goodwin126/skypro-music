import { PlaylistItem } from "./playlistItem";
import { SkeletonItem } from "./SkeletonItem";
import { SearchByMenu } from "./SearchByMenu";
import styled from "styled-components";

const tracks = [
  {
    trackTitle: "Guilt",
    trackAuthor: "Nero",
    trackAlbum: "Welcome Reality",
    trackTime: "4:44",
  },
  {
    trackTitle: "Electro",
    trackAuthor: "Dynoro, Outwork, Mr. Gee",
    trackAlbum: "Electro",
    trackTime: "2:22",
  },
  {
    trackTitle: "I’m Fire",
    trackAuthor: "Ali Bakgor",
    trackAlbum: "I’m Fire",
    trackTime: "2:22",
  },
  {
    trackTitle: "Non Stop",
    trackAuthor: "Стоункат, Psychopath",
    trackAlbum: "Non Stop",
    trackTime: "4:12",
  },
  {
    trackTitle: "Run Run",
    trackSpanContent: "(feat. AR/CO)",
    trackAuthor: "Jaded, Will Clarke, AR/CO",
    trackAlbum: "Run Run",
    trackTime: "2:54",
  },
  {
    trackTitle: "Eyes on Fire",
    trackSpanContent: "(Zeds Dead Remix)",
    trackAuthor: "Blue Foundation, Zeds Dead",
    trackAlbum: "Eyes on Fire",
    trackTime: "5:20",
  },
  {
    trackTitle: "Mucho Bien",
    trackSpanContent: "(Hi Profile Remix)",
    trackAuthor: "HYBIT, Mr. Black, Offer Nissim, Hi Profile",
    trackAlbum: "Mucho Bien",
    trackTime: "3:41",
  },
  {
    trackTitle: "Knives n Cherries",
    trackAuthor: "minthaze",
    trackAlbum: "Captivating",
    trackTime: "1:48",
  },
  {
    trackTitle: "How Deep Is Your Love",
    trackAuthor: "Calvin Harris, Disciples",
    trackAlbum: "How Deep Is Your Love",
    trackTime: "3:32",
  },
  {
    trackTitle: "Morena",
    trackAuthor: "Tom Boxer",
    trackAlbum: "Soundz Made in Romania",
    trackTime: "3:36",
  },
];

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

export function TrackList({ isLoading }) {
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
                  trackTitle={track.trackTitle}
                  trackSpanContent={track.trackSpanContent}
                  trackAuthor={track.trackAuthor}
                  trackAlbum={track.trackAlbum}
                  trackTime={track.trackTime}
                  sprite="/img/icon/sprite.svg"
                />
              ))}
        </StyledContentPlaylist>
      </StyledCenterblockContent>
    </StyledMainCenterblock>
  );
}
