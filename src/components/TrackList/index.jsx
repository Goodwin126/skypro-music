import * as S from "./styles";
import React, { useState } from "react";

import PlaylistItem from "../PlaylistItem";
import SkeletonItem from "../SkeletonItem";
import SearchByMenu from "../SearchByMenu";

import { useSelector, useDispatch } from "react-redux";
import {
  setTrackPlaying,
  setIsPlaying,
  setTrackLike,
  setIsMyTracks,
} from "../../store/trackSlice";

export default function TrackList() {
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [directionTime, setDirectionTime] = useState(null);
  const [searchByName, setSearchByName] = useState("");

  const dispatch = useDispatch();

  const { tracks, isLoading, isMyTracks } = useSelector(
    (state) => state.storage,
  );

  const { trackPlaying, isPlaying } = useSelector(
    (state) => state.storage.track,
  );

  const handleTrackClick = (trackName) => {
    handleStateMyTracks();
    if (trackPlaying === trackName) {
      if (isPlaying) {
        dispatch(setIsPlaying(false));
      } else {
        dispatch(setIsPlaying(true));
      }
    } else {
      dispatch(setTrackPlaying({ trackName }));
      dispatch(setIsPlaying(true));
    }
  };

  const handleStateMyTracks = () => {
    if (!isMyTracks) {
      dispatch(setIsMyTracks(true));
    }
  };

  const handleClickLike = (trackName) => {
    dispatch(setTrackLike({ trackName }));
  };

  const filteredTracks = React.useMemo(() => {
    // Начинаем с полного массива треков
    let result = tracks;

    // Фильтрация по поиску (ищем в названии трека, авторе и альбоме)
    if (searchByName) {
      const searchLower = searchByName.toLowerCase();
      result = result.filter((track) => {
        const titleMatch =
          track.trackTitle?.toLowerCase().includes(searchLower) || false;
        const authorMatch =
          track.trackAuthor?.toLowerCase().includes(searchLower) || false;
        const albumMatch =
          track.trackAlbum?.toLowerCase().includes(searchLower) || false;

        // Возвращаем true, если хотя бы одно поле содержит поисковую строку
        return titleMatch || authorMatch || albumMatch;
      });
    }

    // Фильтрация по жанрам (если жанры выбраны)
    if (selectedGenre.length > 0) {
      result = result.filter((track) =>
        selectedGenre.some(
          (genre) =>
            track.trackGenre?.toLowerCase() === genre.value.toLowerCase(),
        ),
      );
    }

    // Если directionTime null — возвращаем результат фильтрации без сортировки
    if (directionTime === null) {
      return result;
    }

    // Сортируем в зависимости от значения directionTime
    switch (directionTime) {
      case 1: // По умолчанию (без сортировки, сохраняем текущий порядок)
        return result;

      case 2: // Сначала новые (по году: от большего к меньшему)
        return [...result].sort((a, b) => {
          const yearA = parseInt(a.trackYear, 10) || 0;
          const yearB = parseInt(b.trackYear, 10) || 0;
          return yearB - yearA;
        });

      case 3: // Сначала старые (по году: от меньшего к большему)
        return [...result].sort((a, b) => {
          const yearA = parseInt(a.trackYear, 10) || 0;
          const yearB = parseInt(b.trackYear, 10) || 0;
          return yearA - yearB;
        });

      default:
        // На всякий случай — если придёт некорректное значение
        return result;
    }
  }, [tracks, selectedGenre, directionTime, searchByName]); // Зависимости: tracks, selectedGenre, directionTime и searchByName

  const AuthorsTracks = React.useMemo(() => {
    const authorsSet = new Set(
      tracks
        .map((track) => track.trackAuthor)
        .filter((author) => author != null),
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
