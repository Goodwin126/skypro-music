import * as S from '../TrackList/styles';
import React, { useCallback } from 'react';
import PlaylistItem from '../PlaylistItem';
import SkeletonItem from '../SkeletonItem';

import { useSelector, useDispatch } from 'react-redux';
import {
  toggleTrackLike,
  addTrackToFavorite,
  removeTrackFromFavorite,
  setPlaylistFromFavorites,
} from '../../store/trackSlice';

import { useAuth } from '../../context/AuthContext';

export default function MyPlayList() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const { tracks, isLoading } = useSelector((state) => state.storage);
  const { currentTrackId, isPlaying } = useSelector(
    (state) => state.storage.track
  );

  // Фильтруем только избранные треки
  const favoriteTracks = tracks.filter((track) => track.trackLike === true);

  const handleTrackClick = (trackId) => {
    dispatch(setPlaylistFromFavorites({ trackId }));
  };

  const handleTrackClickLike = useCallback(
    async (trackId, currentLikeStatus) => {
      if (!user) {
        return;
      }

      dispatch(toggleTrackLike({ trackId }));

      try {
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
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <SkeletonItem key={index} />
            ))
          ) : favoriteTracks.length === 0 ? (
            <div
              style={{ padding: '20px', color: '#888', textAlign: 'center' }}
            >
              У вас пока нет избранных треков. Нажмите на сердечко, чтобы
              добавить!
            </div>
          ) : (
            favoriteTracks.map((track) => {
              const isLiked = track.trackLike || false;

              return (
                <PlaylistItem
                  key={track._id}
                  trackName={track.name}
                  trackAuthor={track.author}
                  trackAlbum={track.album}
                  trackTime={track.duration_in_seconds}
                  trackLike={isLiked}
                  sprite={
                    track._id === currentTrackId
                      ? 'current-track-play'
                      : '/img/icon/sprite.svg#icon-note'
                  }
                  animate={track._id === currentTrackId}
                  isPlaying={isPlaying}
                  onClickPlay={() => handleTrackClick(track._id)}
                  onClickLike={() => handleTrackClickLike(track._id, isLiked)}
                  isAuthorized={!!user}
                />
              );
            })
          )}
        </S.StyledContentPlaylist>
      </S.StyledCenterblockContent>
    </S.StyledMainCenterblock>
  );
}
