import * as S from "../TrackList/styles";
import React from "react";
import { useParams } from "react-router-dom";

import PlaylistItem from "../PlaylistItem";
import SkeletonItem from "../SkeletonItem";

import { useSelector, useDispatch } from "react-redux";
import {
  setTrackPlaying,
  setIsPlaying,
  setTrackLike,
  setIsMyTracks,
} from "../../store/trackSlice";

export default function GenrePlayList() {
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

  const handleClickLike = (trackName) => {
    dispatch(setTrackLike({ trackName }));
  };

  // Получаем id из URL
  const { id: genreId } = useParams();

  // Сопоставление genreId с именами свойств треков
  const genreToPropertyMap = {
    "Плейлист дня": "trackPlaylistDay",
    "100 танцевальных хитов": "track100DanceTrack",
    "Инди-заряд": "trackIndieCharge",
  };

  // Получаем имя свойства для фильтрации
  const propertyName = genreToPropertyMap[genreId];

  // Фильтруем треки: оставляем только те, у которых соответствующее свойство равно true
  const filteredTracks = React.useMemo(() => {
    if (!propertyName) return [];

    return tracks.filter((track) => track[propertyName] === true);
  }, [tracks, propertyName]);

  return (
    <S.StyledMainCenterblock>
      <S.StyledCenterblockSearch>
        <S.StyledSearchSvg>
          <use href="/img/icon/sprite.svg#icon-search" />
        </S.StyledSearchSvg>
        <S.StyledSearchText type="search" placeholder="Поиск" name="search" />
      </S.StyledCenterblockSearch>
      <S.StyledCenterblockH2>{genreId}</S.StyledCenterblockH2>

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
            : filteredTracks.map((track, index) => (
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
                  onClickLike={() => handleClickLike(track.trackName)}
                />
              ))}
        </S.StyledContentPlaylist>
      </S.StyledCenterblockContent>
    </S.StyledMainCenterblock>
  );
}
