import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://skypro-music-api.skyeng.tech/";

// const BASE_URL = "http://localhost:3001/";

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Асинхронное действие для загрузки треков
export const loadTracks = createAsyncThunk(
  "tracks/loadTracks",
  async (_, { dispatch }) => {
    try {
      // Формируем полный URL: базовый URL + endpoint
      const response = await fetch(`${BASE_URL}catalog/track/all/`);

      // Проверяем статус ответа HTTP (200–299 — успех)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Парсим JSON из тела ответа
      const data = await response.json();

      return data; // Возвращаем данные для fulfilled-состояния
    } catch (error) {
      // Пробрасываем ошибку для rejected-состояния
      throw error;
    }
  },
);

const tracksSlice = createSlice({
  name: "storage",
  initialState: {
    user: null,
    userError: null,
    tracks: [],
    isMyTracks: false,
    track: {
      trackPlaying: null,
      trackLike: false,
      isPlaying: false,
      isMixing: false,
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    setTracks(state, action) {
      const tracksList = action.payload;
      state.tracks = tracksList;
    },
    mixTrack(state, action) {
      if (action.payload.isMixing === false) {
        state.tracks = shuffleArray(state.tracks);
      } else {
        return;
      }
    },
    setTrackPlaying(state, action) {
      if (action.payload?.trackName) {
        state.track.trackPlaying = action.payload.trackName;
        const trackIndex = state.tracks.findIndex(
          (track) => track.trackName === action.payload.trackName,
        );
        if (state.tracks[trackIndex].trackLike) {
          state.track.trackLike = true;
        }
      }
    },
    turnTrackPlaying(state, action) {
      if (state.track.trackPlaying === null) return;

      const currentIndex = state.tracks.findIndex(
        (track) => track.trackName === state.track.trackPlaying,
      );

      if (currentIndex === -1) return;

      // Функция для поиска следующего трека с учётом isMyTracks и trackLike
      const findNextTrackIndex = (startIndex, direction) => {
        const tracksLength = state.tracks.length;
        let index = startIndex;

        do {
          index =
            direction === "next"
              ? (index + 1) % tracksLength
              : (index - 1 + tracksLength) % tracksLength;

          // Если isMyTracks === true, проверяем trackLike
          if (state.isMyTracks) {
            if (state.tracks[index].trackLike === true) {
              return index;
            }
          } else {
            // Если isMyTracks === false, берём любой трек
            return index;
          }
        } while (index !== startIndex); // Продолжаем, пока не вернёмся к стартовой точке

        // Если не нашли подходящий трек, возвращаем -1
        return -1;
      };

      let nextTrackIndex = -1;

      if (action.payload.next) {
        // Ищем следующий трек
        nextTrackIndex = findNextTrackIndex(currentIndex, "next");
      } else {
        // Ищем предыдущий трек
        nextTrackIndex = findNextTrackIndex(currentIndex, "prev");
      }

      // Если нашли подходящий трек, устанавливаем его как текущий
      if (nextTrackIndex !== -1) {
        state.track.trackPlaying = state.tracks[nextTrackIndex].trackName;
      }
    },

    setTrackLike(state, action) {
      const trackName = action.payload.trackName;
      const trackIndex = state.tracks.findIndex(
        (track) => track.trackName === trackName,
      );

      if (trackIndex !== -1) {
        state.tracks[trackIndex].trackLike =
          !state.tracks[trackIndex].trackLike;
      }
    },
    setTrackOnlyLike(state, action) {
      const trackName = action.payload.trackName;
      const trackIndex = state.tracks.findIndex(
        (track) => track.trackName === trackName,
      );

      if (trackIndex !== -1) {
        state.tracks[trackIndex].trackLike = true;
      }
    },
    setTrackOnlyDislike(state, action) {
      const trackName = action.payload.trackName;
      const trackIndex = state.tracks.findIndex(
        (track) => track.trackName === trackName,
      );

      if (trackIndex !== -1) {
        state.tracks[trackIndex].trackLike = false;
      }
    },

    setIsPlaying(state, action) {
      state.track.isPlaying = action.payload;
    },
    togglePlay(state) {
      state.track.isPlaying = !state.isPlaying;
    },

    setCurrentTime(state, action) {
      state.track.currentTime = action.payload;
    },

    setVolume(state, action) {
      state.track.volume = action.payload;
    },

    setLoop(state, action) {
      state.track.isLoop = action.payload;
    },
    setIsMyTracks(state, action) {
      state.isMyTracks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTracks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadTracks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tracks = action.payload;
      })
      .addCase(loadTracks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setTracks,
  mixTrack,
  setTrackPlaying,
  turnTrackPlaying,
  setIsPlaying,
  togglePlay,
  setCurrentTime,
  setVolume,
  setLoop,
  setTrackLike,
  setTrackOnlyLike,
  setTrackOnlyDislike,
  setIsMyTracks,
} = tracksSlice.actions;

export default tracksSlice.reducer;
