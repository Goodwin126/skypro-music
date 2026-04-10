import * as S from "../TrackList/styles";
import React from "react";

import PlaylistItem from "../PlaylistItem";
import SkeletonItem from "../SkeletonItem";

import { useSelector, useDispatch } from "react-redux";
import {
  setTrackPlaying,
  setIsPlaying,
  setTrackLike,
  setIsMyTracks,
} from "../../store/trackSlice";

export default function MyPlayList() {
  const dispatch = useDispatch();

  const { tracks, isLoading, isMyTracks } = useSelector(
    (state) => state.storage,
  );

  const { trackPlaying, isPlaying } = useSelector(
    (state) => state.storage.track,
  );

  const handleTrackClick = (trackName) => {
    dispatch(setTrackPlaying({ trackName }));
    dispatch(setIsPlaying(true));

    if (isMyTracks === false) {
      dispatch(setIsMyTracks(true));
    }
  };

  const handelClickLike = (trackName) => {
    dispatch(setTrackLike({ trackName }));
  };

  return (
    <S.StyledMainCenterblock>
      <S.StyledCenterblockSearch>
        <S.StyledSearchSvg>
          <use href="/img/icon/sprite.svg#icon-search" />
        </S.StyledSearchSvg>
        <S.StyledSearchText type="search" placeholder="Поиск" name="search" />
      </S.StyledCenterblockSearch>
      <S.StyledCenterblockH2>Мои треки</S.StyledCenterblockH2>

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
            : tracks.map((track, index) =>
                track.trackLike ? (
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
                    onClickPlay={() => handleTrackClick(track.trackName)}
                    onClickLike={() => handelClickLike(track.trackName)}
                  />
                ) : null,
              )}
        </S.StyledContentPlaylist>
      </S.StyledCenterblockContent>
    </S.StyledMainCenterblock>
  );
}
