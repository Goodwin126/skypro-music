import React, { useMemo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  setTrackPlayingId,
  setCurrentPlaylist,
  toggleTrackLike,
  addTrackToFavorite,
  loadTracksSelection,
  removeTrackFromFavorite,
} from '../../store/trackSlice';

import { useAuth } from '../../context/AuthContext';
import PlaylistItem from '../PlaylistItem';
import SkeletonItem from '../SkeletonItem';
import * as S from '../TrackList/styles';

export default function GenrePlayList() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  // Получаем id из URL
  const { id: genreId } = useParams();

  useEffect(() => {
    dispatch(loadTracksSelection({ Selection_Id: genreId }));
  }, [dispatch, genreId]);

  const { tracks, tracksSelection, isLoading } = useSelector(
    (state) => state.storage
  );

  const { currentTrackId, isPlaying } = useSelector(
    (state) => state.storage.track
  );

  // Логика клика по треку (плей)
  const handleTrackClick = (trackId) => {
    dispatch(setTrackPlayingId({ trackId }));
  };

  const titlePage = useMemo(() => {
    if (genreId === '2') {
      return 'Плейлист дня';
    }
    if (genreId === '3') {
      return '100 танцевальных хитов';
    }
    if (genreId === '4') {
      return 'Инди-заряд';
    }
  }, [genreId]);

  const filteredTracks = useMemo(() => {
    const list_Id = Number(genreId);

    if (!genreId) return [];

    // 1. Находим объект подборки
    const targetList = tracksSelection.find((item) => item._id === list_Id);

    if (!targetList) return [];

    // Превращаем список ID в набор строк для надежного сравнения
    const idsList = (targetList.items || []).map((id) => String(id));

    // Фильтруем большой массив tracks: оставляем только те, чей _id есть в idsList
    return tracks.filter((track) => {
      return idsList.includes(String(track._id));
    });
  }, [tracks, tracksSelection, genreId]);

  React.useEffect(() => {
    dispatch(setCurrentPlaylist(filteredTracks));
  }, [filteredTracks, dispatch]);

  const handleLike = useCallback(
    async (trackId, currentLikeStatus) => {
      // 1. Проверка: если нет юзера -> стоп
      if (!user) {
        return;
      }

      // 2. Локальное переключение (UI сразу реагирует)
      dispatch(toggleTrackLike({ trackId }));

      try {
        // 3. Запрос на сервер (используем СТАТУС ДО клика)
        if (!currentLikeStatus) {
          await dispatch(addTrackToFavorite({ trackId })).unwrap();
        } else {
          await dispatch(removeTrackFromFavorite({ trackId })).unwrap();
        }
      } catch (error) {
        console.error('Ошибка синхронизации лайка:', error);
        dispatch(toggleTrackLike({ trackId }));
      }
    },
    [user, dispatch]
  );

  return (
    <S.StyledMainCenterblock>
      <S.StyledCenterblockSearch>
        <S.StyledSearchSvg>
          <use href="/img/icon/sprite.svg#icon-search" />
        </S.StyledSearchSvg>
        <S.StyledSearchText type="search" placeholder="Поиск" name="search" />
      </S.StyledCenterblockSearch>

      <S.StyledCenterblockH2>{titlePage}</S.StyledCenterblockH2>

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
            : filteredTracks.map((track) => {
                const isLiked = track.trackLike || false;

                return (
                  <PlaylistItem
                    key={track._id}
                    trackName={track.name}
                    trackTitle={track.author}
                    trackSpanContent={track.trackSpanContent}
                    trackAuthor={track.author}
                    trackAlbum={track.album}
                    trackTime={track.duration_in_seconds}
                    sprite={
                      track._id === currentTrackId
                        ? 'current-track-play'
                        : '/img/icon/sprite.svg#icon-note'
                    }
                    trackLike={isLiked}
                    animate={track._id === currentTrackId}
                    isPlaying={isPlaying}
                    onClickPlay={() => handleTrackClick(track._id)}

                    onClickLike={() => handleLike(track._id, isLiked)}

                    isAuthorized={!!user}
                  />
                );
              })}
        </S.StyledContentPlaylist>
      </S.StyledCenterblockContent>
    </S.StyledMainCenterblock>
  );
}
