import * as S from './styles';
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PlaylistItem from '../PlaylistItem';
import SkeletonItem from '../SkeletonItem';
import SearchByMenu from '../SearchByMenu';

// Импорт контекста авторизации
import { useAuth } from '../../context/AuthContext';

import {
  toggleTrackLike,
  addTrackToFavorite,
  removeTrackFromFavorite,
  setTrackPlayingId,
  setCurrentPlaylist,
} from '../../store/trackSlice';

export default function TrackList() {
  const { user } = useAuth();
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [directionTime, setDirectionTime] = useState(null);
  const [searchByName, setSearchByName] = useState('');

  const dispatch = useDispatch();

  const { tracks, isLoading } = useSelector((state) => state.storage);
  const { currentTrackId, isPlaying } = useSelector(
    (state) => state.storage.track
  );

  const handleTrackClick = (trackId) => {
    dispatch(setTrackPlayingId({ trackId }));
  };
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

  const filteredTracks = React.useMemo(() => {
    let result = tracks;

    // Фильтрация по поиску
    if (searchByName) {
      const searchLower = searchByName.toLowerCase();
      result = result.filter((track) => {
        const titleMatch =
          track.name?.toLowerCase().includes(searchLower) || false;
        const authorMatch =
          track.author?.toLowerCase().includes(searchLower) || false;
        const albumMatch =
          track.album?.toLowerCase().includes(searchLower) || false;

        return titleMatch || authorMatch || albumMatch;
      });
    }

    // Фильтрация по жанрам
    if (selectedGenre.length > 0) {
      result = result.filter((track) =>
        selectedGenre.some((filterItem) => {
          const filterVal = String(filterItem.value).toLowerCase();
          return track.genre?.some(
            (g) => String(g).toLowerCase() === filterVal
          );
        })
      );
    }

    if (directionTime === null || directionTime === 1) {
      return result;
    }

    switch (directionTime) {
      case 2: // Сначала новые
        return [...result].sort((a, b) => {
          const dateA = a.release_date || '';
          const dateB = b.release_date || '';
          if (dateA > dateB) return -1;
          if (dateA < dateB) return 1;
          return 0;
        });

      case 3: // Сначала старые
        return [...result].sort((a, b) => {
          const dateA = a.release_date || '';
          const dateB = b.release_date || '';
          if (dateA < dateB) return -1;
          if (dateA > dateB) return 1;
          return 0;
        });

      default:
        return result;
    }
  }, [tracks, selectedGenre, directionTime, searchByName]);

  useEffect(() => {
    dispatch(setCurrentPlaylist(filteredTracks));
  }, [filteredTracks, dispatch]);

  const AuthorsTracks = React.useMemo(() => {
    const authorsSet = new Set(
      tracks.map((track) => track.author).filter((author) => author != null)
    );
    return [...authorsSet].sort();
  }, [tracks]);

  return (
    <S.StyledMainCenterblock>
      <S.StyledCenterblockSearch>
        <S.StyledSearchSvg>
          <use href="/img/icon/sprite.svg#icon-search" />
        </S.StyledSearchSvg>
        <S.StyledSearchText
          type="search"
          placeholder="Поиск"
          name="search"
          value={searchByName}
          onChange={(e) => setSearchByName(e.target.value)}
        />
      </S.StyledCenterblockSearch>

      <S.StyledCenterblockH2>Треки</S.StyledCenterblockH2>

      <SearchByMenu
        setSelectedGenre={setSelectedGenre}
        selectedGenre={selectedGenre}
        setDirectionTime={setDirectionTime}
        AuthorsTracks={AuthorsTracks}
        setSearchByName={setSearchByName}
      />

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
                    trackLike={track.trackLike}
                    animate={track._id === currentTrackId}
                    isPlaying={isPlaying}
                    onClickPlay={() => handleTrackClick(track._id)}
                    onClickLike={() => handleLike(track._id, isLiked)}
                  />
                );
              })}
        </S.StyledContentPlaylist>
      </S.StyledCenterblockContent>
    </S.StyledMainCenterblock>
  );
}
