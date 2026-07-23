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
  const [directionTime, setDirectionTime] = useState(1);
  const [searchByName, setSearchByName] = useState('');
  const [searchedByNames, setsearchedByNames] = useState([]);

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
      dispatch(toggleTrackLike({ trackId }));

      try {
        if (!currentLikeStatus) {
          await dispatch(addTrackToFavorite({ trackId })).unwrap();
        } else {
          await dispatch(removeTrackFromFavorite({ trackId })).unwrap();
        }
      } catch (error) {
        console.error('Ошибка синхронизации лайка:', error);
        // Откатываем UI, если сервер вернул ошибку
        dispatch(toggleTrackLike({ trackId }));
      }
    },
    [dispatch] // user больше не нужен в зависимостях
  );

  const filteredTracks = React.useMemo(() => {
    // Начинаем с полного списка (или пустого, если данных нет)
    let result = tracks || [];

    // --- ШАГ 1: ОБЩИЙ ПОИСК (должен быть ПЕРВЫМ) ---
    // Если пользователь что-то вбил в строку поиска, сужаем список сразу
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

    // --- ШАГ 2: ФИЛЬТР ПО ЖАНРАМ ---
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

    // --- ШАГ 3: ФИЛЬТР ПО ИСПОЛНИТЕЛЮ (из меню) ---
    if (searchedByNames.length > 0) {
      const normalizedAuthors = searchedByNames.map((name) =>
        name.toLowerCase()
      );

      result = result.filter((track) => {
        const trackAuthor = track.author?.toLowerCase();
        // Оставляем трек, если его автор есть в списке выбранных
        return normalizedAuthors.includes(trackAuthor);
      });
    }

    // --- ШАГ 4: СОРТИРОВКА ---
    if (directionTime === null || directionTime === 1) {
      return result;
    }

    switch (directionTime) {
      case 2: // Сначала новые
        return [...result].sort((a, b) => {
          const dateA = new Date(a.release_date).getTime() || 0;
          const dateB = new Date(b.release_date).getTime() || 0;
          return dateB - dateA;
        });

      case 3: // Сначала старые
        return [...result].sort((a, b) => {
          const dateA = new Date(a.release_date).getTime() || 0;
          const dateB = new Date(b.release_date).getTime() || 0;
          return dateA - dateB;
        });

      default:
        return result;
    }
  }, [tracks, selectedGenre, directionTime, searchByName, searchedByNames]);

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
        directionTime={directionTime}
        AuthorsTracks={AuthorsTracks}
        searchByName={searchByName}
        searchedByNames={searchedByNames}
        setsearchedByNames={setsearchedByNames}
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
                    isAuthorized={!!user}
                  />
                );
              })}
        </S.StyledContentPlaylist>
      </S.StyledCenterblockContent>
    </S.StyledMainCenterblock>
  );
}
