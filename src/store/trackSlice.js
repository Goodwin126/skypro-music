import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://webdev-music-003b5b991590.herokuapp.com/';

// Вспомогательная функция для получения токена из localStorage
const getAuthToken = () => {
  const tokensStr = localStorage.getItem('tokens');
  if (!tokensStr) return null;
  try {
    const tokens = JSON.parse(tokensStr);
    return tokens.access;
  } catch (e) {
    console.warn('⚠️ Не удалось распарсить токены из localStorage:', e);
    return null;
  }
};

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const loadTracks = createAsyncThunk('tracks/loadTracks', async () => {
  const response = await fetch(`${BASE_URL}catalog/track/all/`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  const data = await response.json();
  const rawTracks = Array.isArray(data) ? data : data.data || [];

  return rawTracks.map((track) => ({
    ...track,
    trackLike: false, // По умолчанию не лайкнуто
  }));
});

export const loadFavoriteTracks = createAsyncThunk(
  'favoriteTracks/loadTracks',
  async () => {
    const token = getAuthToken();

    if (!token) {
      throw new Error('Нет токена авторизации');
    }

    const response = await fetch(`${BASE_URL}catalog/track/favorite/all/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Сессия истекла. Пожалуйста, войдите снова.');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : data.data || [];
  }
);

// 2. Добавить в избранное
export const addTrackToFavorite = createAsyncThunk(
  'tracks/addTrackToFavorite',
  async ({ trackId }) => {
    const token = getAuthToken();
    if (!token) throw new Error('Нет токена авторизации');

    const response = await fetch(
      `${BASE_URL}catalog/track/${trackId}/favorite/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) throw new Error('Сессия истекла');
      throw new Error(`Ошибка добавления: ${response.status}`);
    }

    return trackId;
  }
);

// 3. Удалить из избранного
export const removeTrackFromFavorite = createAsyncThunk(
  'tracks/removeTrackFromFavorite',
  async ({ trackId }) => {
    const token = getAuthToken();
    if (!token) throw new Error('Нет токена авторизации');

    const response = await fetch(
      `${BASE_URL}catalog/track/${trackId}/favorite/`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) throw new Error('Сессия истекла');
      throw new Error(`Ошибка удаления: ${response.status}`);
    }

    return trackId;
  }
);

const tracksSlice = createSlice({
  name: 'storage',
  initialState: {
    tracks: [],
    currentPlaylist: [],
    track: {
      currentTrackId: null,
      isPlaying: false,
      isMixing: false,
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    // подключаем все треки
    setTracks(state, action) {
      state.tracks = action.payload;
    },
    // подключаем текущего плейлиста из компонентов
    setCurrentPlaylist(state, action) {
      state.currentPlaylist = action.payload;
    },
    // подключаем списк любимых треков
    setIsMyTracks(state, action) {
      state.isMyTracks = action.payload;
    },

    // миксуем все треки
    mixTrack(state, action) {
      if (action.payload.isMixing === true) {
        // Перемешиваем именно currentPlaylist, если он есть, иначе tracks
        const targetList =
          state.currentPlaylist.length > 0
            ? state.currentPlaylist
            : state.tracks;
        state.currentPlaylist = shuffleArray(targetList);

        // Опционально: если плейлист перемешан, можно сбросить текущий трек на первый
        if (state.currentPlaylist.length > 0) {
          state.track.currentTrackId = state.currentPlaylist[0]._id;
        }
      }
    },
    //включаем трек по ID
    setTrackPlayingId(state, action) {
      if (action.payload?.trackId) {
        state.track.currentTrackId = action.payload.trackId;
      }
    },
    //переключаем следующий трек по ID
    turnTrackPlaying(state, action) {
      const playlist = state.currentPlaylist;

      if (!playlist || playlist.length === 0) {
        return;
      }

      const currentId = state.track.currentTrackId;
      if (!currentId) return;

      const currentIndex = playlist.findIndex(
        (track) => track._id === currentId
      );

      if (currentIndex === -1) {
        console.warn('⚠️ Текущий трек не найден в текущем плейлисте.');
        return;
      }

      let nextIndex;
      const len = playlist.length;

      if (action.payload.next) {
        nextIndex = (currentIndex + 1) % len;
      } else {
        nextIndex = (currentIndex - 1 + len) % len;
      }

      const nextTrack = playlist[nextIndex];

      if (nextTrack && nextTrack._id) {
        state.track.currentTrackId = nextTrack._id;
      }
    },

    toggleTrackLike: (state, action) => {
      const trackId = action.payload.trackId;
      const track = state.tracks.find((t) => t._id === trackId);
      if (track) {
        track.trackLike = !track.trackLike;
      }
    },

    setPlaylistFromFavorites: (state, action) => {
      const trackId = action.payload.trackId;

      // 1. Берем все треки, у которых стоит лайк
      const favoriteTracks = state.tracks.filter((t) => t.trackLike === true);

      if (favoriteTracks.length === 0) {
        console.warn('⚠️ Нет избранных треков для формирования плейлиста');
        return;
      }

      // 2. Сортируем их (например, по ID или имени), чтобы порядок не прыгал
      favoriteTracks.sort((a, b) => String(a._id).localeCompare(String(b._id)));

      state.currentPlaylist = favoriteTracks;

      // 3. Сразу ставим переданный трек как текущий (если он есть в списке)
      const selectedTrack = favoriteTracks.find((t) => t._id === trackId);
      if (selectedTrack) {
        state.track.currentTrackId = selectedTrack._id;
      } else {
        // Если вдруг трека нет (редкий кейс гонки состояний), берем первый
        state.track.currentTrackId = favoriteTracks[0]._id;
      }
    },

    //включаем состояние проигрывания
    setIsPlaying(state, action) {
      state.track.isPlaying = action.payload;
    },
    // переключаем состояние проигрывания
    togglePlay(state) {
      state.track.isPlaying = !state.track.isPlaying;
    },
    // переключаем состояние времени
    setCurrentTime(state, action) {
      state.track.currentTime = action.payload;
    },
    // переключаем состояние громкости
    setVolume(state, action) {
      state.track.volume = action.payload;
    },
    // переключаем состояние зациклености
    setLoop(state, action) {
      state.track.isLoop = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Обработка загрузки всех треков
    builder
      .addCase(loadTracks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadTracks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tracks = action.payload;
        state.currentPlaylist = action.payload;
      })
      .addCase(loadTracks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      // загрузка всех избранных
      .addCase(loadFavoriteTracks.pending, (state) => {
        state.isLoading = true;
      })
      // зангрузка всех избранных Успех
      .addCase(loadFavoriteTracks.fulfilled, (state, action) => {
        state.isLoading = false;
        const favoriteIds = new Set(action.payload.map((t) => t._id));

        state.tracks = state.tracks.map((track) => {
          const isFavorite = favoriteIds.has(track._id);
          return { ...track, trackLike: isFavorite };
        });

        state.currentPlaylist = state.tracks.filter((t) => t.trackLike);

        if (state.currentPlaylist.length > 0) {
          state.track.currentTrackId = state.currentPlaylist[0]._id;
        }
      })
      // зангрузка всех избранных
      .addCase(loadFavoriteTracks.rejected, (state, action) => {
        state.isLoading = false;
        // action здесь используется для получения сообщения об ошибке
        console.error('Ошибка загрузки избранного:', action.error.message);
      })

      // Добавление в избранное (успех)
      .addCase(addTrackToFavorite.fulfilled, (state) => {
        // Успех: состояние уже изменено в toggleTrackLike, ничего делать не надо.
        state.error = null;
      })
      // Добавление в избранное (ошибка) -> ОТКАТ
      .addCase(addTrackToFavorite.rejected, (state, action) => {
        const trackId = action.meta.arg.trackId;
        const track = state.tracks.find((t) => t._id === trackId);
        if (track && track.trackLike === true) {
          track.trackLike = false;
        }
        state.error = `Не удалось добавить трек: ${action.error.message}`;
        console.warn('Не удалось добавить трек в избранное.');
      })
      // Удаление из избранного (успех)
      .addCase(removeTrackFromFavorite.fulfilled, (state) => {
        state.error = null;
      })
      // Удаление из избранного (ошибка) -> ОТКАТ
      .addCase(removeTrackFromFavorite.rejected, (state, action) => {
        const trackId = action.meta.arg.trackId;
        const track = state.tracks.find((t) => t._id === trackId);
        if (track && track.trackLike === false) {
          track.trackLike = true;
        }
        state.error = `Не удалось удалить трек: ${action.error.message}`;
        alert('Не удалось удалить трек из избранного.');
      });
  },
});

export const {
  setTracks,
  mixTrack,
  setTrackPlayingId,
  toggleTrackLike,
  turnTrackPlaying,
  setIsPlaying,
  togglePlay,
  setCurrentTime,
  setVolume,
  setLoop,
  setTrackLike,
  setIsMyTracks,
  setCurrentPlaylist,
  setPlaylistFromFavorites,
} = tracksSlice.actions;

export default tracksSlice.reducer;
