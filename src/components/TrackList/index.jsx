import * as S from "./styles";
import React from "react";

import PlaylistItem from "../PlaylistItem";
import SkeletonItem from "../SkeletonItem";
import SearchByMenu from "../SearchByMenu";

import { useSelector, useDispatch } from "react-redux";
import { setTrackPlaying, setIsPlaying } from "../../store/trackSlice";

export default function TrackList() {
  const dispatch = useDispatch();

  const { tracks, isLoading, trackPlaying, isPlaying } = useSelector(
    (state) => state.storage,
  );

  const handleTrackClick = (trackName) => {
    dispatch(setTrackPlaying({ trackName }));
    dispatch(setIsPlaying(true));
  };

  return (
    <S.StyledMainCenterblock>
      <S.StyledCenterblockSearch>
        <S.StyledSearchSvg>
          <use href="/img/icon/sprite.svg#icon-search" />
        </S.StyledSearchSvg>
        <S.StyledSearchText type="search" placeholder="Поиск" name="search" />
      </S.StyledCenterblockSearch>
      <S.StyledCenterblockH2>Треки</S.StyledCenterblockH2>
      <SearchByMenu />

      <S.StyledCenterblockContent>
        <S.StyledContentTitle>
          <S.StyledCol01>Трек</S.StyledCol01>
          <S.StyledCol02>ИСПОЛНИТЕЛЬ</S.StyledCol02>
          <S.StyledCol03>АЛЬБОМ</S.StyledCol03>
          <S.StyledCol04>
            <S.StyledplaylistTitleSvg alt="time">
              <use href="/img/icon/sprite.svg#icon-watch" />
            </S.StyledplaylistTitleSvg>
          </S.StyledCol04>
        </S.StyledContentTitle>

        <S.StyledContentPlaylist>
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <SkeletonItem key={index} />
              ))
            : tracks.map((track, index) => (
                <PlaylistItem
                  key={index}
                  trackName={track.trackName}
                  trackTitle={track.trackTitle}
                  trackSpanContent={track.trackSpanContent}
                  trackAuthor={track.trackAuthor}
                  trackAlbum={track.trackAlbum}
                  trackTime={track.trackTime}
                  sprite={
                    track.trackName === trackPlaying
                      ? "current-track-play"
                      : "/img/icon/sprite.svg#icon-note"
                  }
                  trackLike={track.trackLike}
                  animate={track.trackName === trackPlaying}
                  isPlaying={isPlaying}
                  onClick={() => handleTrackClick(track.trackName)}
                />
              ))}
        </S.StyledContentPlaylist>
      </S.StyledCenterblockContent>
    </S.StyledMainCenterblock>
  );
}
