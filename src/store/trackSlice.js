import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

//действие для регистрации пользователя
export const registrationUser = createAsyncThunk(
  "user/registration",
  async (registrationData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://skypro-music-api.skyeng.tech/user/signup/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        },
      );

      // Проверяем статус ответа
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        // Для 400 возвращаем ошибки валидации
        if (response.status === 400) {
          return rejectWithValue(errorData);
        }

        // Для других ошибок — общее сообщение
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Успешный ответ (201)
      const userData = await response.json();
      return userData;
    } catch (error) {
      // Обработка сетевых ошибок и других исключений
      return rejectWithValue({
        error: error.message || "Произошла ошибка при регистрации",
      });
    }
  },
);

// Асинхронное действие для загрузки треков
export const loadTracks = createAsyncThunk(
  "tracks/loadTracks",
  async (_, { dispatch }) => {
    try {
      // Формируем полный URL: базовый URL + endpoint
      const response = await fetch("http://localhost:3001/tracks");

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
    track: {
      trackPlaying: null,
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
      if (action.payload.isMixing === true) {
        state.tracks = shuffleArray(state.tracks);
      } else {
        return;
      }
    },
    setTrackPlaying(state, action) {
      if (action.payload?.trackName) {
        state.track.trackPlaying = action.payload.trackName;
      }
    },
    turnTrackTrackPlaying(state, action) {
      if (state.track.trackPlaying === null) return;

      const currentIndex = state.tracks.findIndex(
        (track) => track.trackName === state.track.trackPlaying,
      );

      if (currentIndex === -1) return;

      if (action.payload.next) {
        if (currentIndex < state.tracks.length - 1) {
          state.track.trackPlaying = state.tracks[currentIndex + 1].trackName;
        }
      } else {
        if (currentIndex > 0) {
          state.track.trackPlaying = state.tracks[currentIndex - 1].trackName;
        }
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
      })
      .addCase(registrationUser.pending, (state) => {
        state.isLoading = true;
        state.userError = null;
      })
      .addCase(registrationUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // сохраняем данные пользователя
        state.userError = null;
      })
      .addCase(registrationUser.rejected, (state, action) => {
        state.isLoading = false;
        state.userError = action.payload; // сохраняем ошибки валидации
      });
  },
});

export const {
  setTracks,
  mixTrack,
  setTrackPlaying,
  turnTrackTrackPlaying,
  setIsPlaying,
  togglePlay,
  setCurrentTime,
  setVolume,
  setLoop,
} = tracksSlice.actions;

export default tracksSlice.reducer;
