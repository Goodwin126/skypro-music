import { createSlice } from "@reduxjs/toolkit";

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const tracksSlice = createSlice({
  name: "tracks",
  initialState: {
    tracks: [], // исходный лист для рендеринга
    tracksListPlaying: [], // лист проигрывания
    trackPlaying: null,
    isPlaying: false,
  },
  reducers: {
    setTracks(state, action) {
      // Если payload передан — используем его, иначе берём дефолтный список
      const tracksList = action.payload || [
        {
          trackName: "Luke-Bergs-Bliss(chosic.com)",
          trackTitle: "Hyperreal",
          trackAuthor: "Flume",
          trackAlbum: "Skin",
          trackTime: "4:12",
        },
        {
          trackName: "alexander-nakarada-superepic(chosic.com)",
          trackTitle: "A Moment Apart",
          trackAuthor: "Odesza",
          trackAlbum: "A Moment Apart",
          trackTime: "5:03",
        },
        {
          trackName:
            "fm-freemusic-inspiring-optimistic-upbeat-energetic-guitar-rhythm(chosic.com)",
          trackTitle: "Kerala",
          trackAuthor: "Bonobo",
          trackAlbum: "Migration",
          trackTime: "4:47",
        },
        {
          trackName: "HEROICCC(chosic.com)",
          trackTitle: "Awake",
          trackAuthor: "Tycho",
          trackAlbum: "Awake",
          trackTime: "3:58",
        },
        {
          trackName: "Luke-Bergs-Take-It-Easy(chosic.com)",
          trackTitle: "Heat Waves",
          trackAuthor: "Glass Animals",
          trackAlbum: "Dreamland",
          trackTime: "3:54",
        },
        {
          trackName: "roa-music-summer-madness(chosic.com)",
          trackTitle: "Underwater",
          trackAuthor: "RÜFÜS DU SOL",
          trackAlbum: "Surrender",
          trackTime: "4:29",
        },
      ];

      state.tracks = tracksList;
      state.tracksListPlaying = tracksList;
    },

    mixTrack(state, action) {
      if (action.payload.isMixing === false) {
        state.tracksListPlaying = shuffleArray(state.tracks);
      } else {
        state.tracksListPlaying = state.tracks;
      }
    },

    setTrackPlaying(state, action) {
      if (action.payload?.trackName) {
        state.trackPlaying = action.payload.trackName;
      }
    },

    turnTrackTrackPlaying(state, action) {
      if (state.trackPlaying === null) return;

      const currentIndex = state.tracksListPlaying.findIndex(
        (track) => track.trackName === state.trackPlaying,
      );

      if (currentIndex === -1) return;

      if (action.payload.next) {
        // Если есть следующий трек — переключаемся
        if (currentIndex < state.tracksListPlaying.length - 1) {
          state.trackPlaying =
            state.tracksListPlaying[currentIndex + 1].trackName;
        }
        // Если это последний трек — можно:
        // - остановить плеер: state.trackPlaying = null;
        // - зациклить плейлист: state.trackPlaying = state.tracksListPlaying[0].trackName;
      } else {
        // Логика для "предыдущего трека" (как раньше)
        if (currentIndex > 0) {
          state.trackPlaying =
            state.tracksListPlaying[currentIndex - 1].trackName;
        }
      }
    },
    setIsPlaying(state, action) {
      state.isPlaying = action.payload;
    },
    togglePlay(state) {
      state.isPlaying = !state.isPlaying;
    },
  },
});

export const {
  setTracks,
  mixTrack,
  setTrackPlaying,
  turnTrackTrackPlaying,
  setIsPlaying,
  togglePlay,
} = tracksSlice.actions;
export default tracksSlice.reducer;
