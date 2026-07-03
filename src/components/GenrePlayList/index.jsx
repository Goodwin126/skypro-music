import React, { useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  setTrackPlayingId,
  setCurrentPlaylist,
  toggleTrackLike,
  addTrackToFavorite,
  removeTrackFromFavorite,
} from '../../store/trackSlice';

import { useAuth } from '../../context/AuthContext';
import PlaylistItem from '../PlaylistItem';
import SkeletonItem from '../SkeletonItem';
import * as S from '../TrackList/styles';

export default function GenrePlayList() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const { tracks, isLoading } = useSelector((state) => state.storage);
  const { currentTrackId, isPlaying } = useSelector(
    (state) => state.storage.track
  );

  // Логика клика по треку (плей)
  const handleTrackClick = (trackId) => {
    dispatch(setTrackPlayingId({ trackId }));
  };

  // Получаем id из URL
  const { id: genreId } = useParams();

  // Карта жанров
  const genreToPropertyMap = {
    'Плейлист дня': 'trackPlaylistDay',
    '100 танцевальных хитов': 'track100DanceTrack',
    'Инди-заряд': 'trackIndieCharge',
  };

  const propertyName = genreToPropertyMap[genreId];

  const filteredTracks = useMemo(() => {
    if (!propertyName) return [];

    if (propertyName === 'trackPlaylistDay') {
      const shuffled = [...tracks].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 10);
    }

    if (propertyName === 'track100DanceTrack') {
      return [...tracks].sort((a, b) => {
        const countA = Array.isArray(a.staredUser) ? a.staredUser.length : 0;
        const countB = Array.isArray(b.staredUser) ? b.staredUser.length : 0;
        return countB - countA;
      });
    }

    if (propertyName === 'trackIndieCharge') {
      const searchTerm = 'электронная музыка';
      return tracks.filter((track) =>
        track.genre?.some((g) => g.toLowerCase().includes(searchTerm))
      );
    }

    return [];
  }, [tracks, propertyName]);

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
