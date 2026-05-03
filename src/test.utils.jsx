import { configureStore } from "@reduxjs/toolkit";
import tracksReducer from "./store/trackSlice";

import { render } from "@testing-library/react";
import { Provider } from "react-redux";

// 1. Сохраняем старый простой store для обратной совместимости
export const createSimpleMockStore = () => {
  const emptyReducer = (state = {}) => state;
  return configureStore({
    reducer: { dummy: emptyReducer },
    middleware: (gdm) =>
      gdm({
        serializableCheck: false,
        immutableCheck: false,
      }),
  });
};

// 2. Добавляем новый store с полной структурой
export const createTestStoreWithTracks = (preloadedState = {}) => {
  const initialState = {
    storage: {
      user: null,
      userError: null,
      tracks: [],
      isMyTracks: false,
      track: {
        trackPlaying: null,
        isPlaying: false,
        isMixing: false,
        currentTime: 0,
        volume: 1,
        isLoop: false,
      },
      isLoading: false,
      error: null,
    },
  };

  return configureStore({
    reducer: { storage: tracksReducer },
    preloadedState: { ...initialState, ...preloadedState },
    middleware: (gdm) =>
      gdm({
        serializableCheck: false,
        immutableCheck: false,
      }),
  });
};

// 3. Обновляем customRender — теперь он принимает тип store
export const customRender = (
  ui,
  { storeType = "simple", preloadedState, ...options } = {},
) => {
  let store;

  switch (storeType) {
    case "tracks":
      store = createTestStoreWithTracks(preloadedState);
      break;
    default:
      store = createSimpleMockStore();
  }

  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );
  return render(ui, { wrapper: Wrapper, ...options });
};
