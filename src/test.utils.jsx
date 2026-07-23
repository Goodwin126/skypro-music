import { render } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import tracksReducer from '../src/store/trackSlice';

// --- СОЗДАЕМ ЗАГЛУШКИ (MOCK PROVIDERS) ---
// Они ничего не делают, но позволяют компонентам вызывать useAuth/useToken без ошибки
const MockAuthProvider = ({ children }) => <>{children}</>;
const MockTokenProvider = ({ children }) => <>{children}</>;

export const createSimpleMockStore = () => {
  const emptyReducer = (state = {}) => state;
  return configureStore({
    reducer: { dummy: emptyReducer },
    middleware: (gdm) =>
      gdm({ serializableCheck: false, immutableCheck: false }),
  });
};

export const createTestStoreWithTracks = (preloadedState = {}) => {
  const initialState = {
    storage: {
      user: null,
      tracks: [],
      tracksSelection: [],
      currentPlaylist: [],
      track: {
        currentTrackId: null,
        isPlaying: false,
        isMixing: false,
      },
      isLoading: false,
      error: null,
    },
  };
  return configureStore({
    reducer: { storage: tracksReducer },
    preloadedState: { ...initialState, ...preloadedState },
    middleware: (gdm) =>
      gdm({ serializableCheck: false, immutableCheck: false }),
  });
};

export const customRender = (
  ui,
  {
    storeType = 'simple',
    preloadedState,
    initialEntries = ['/'],
    // Добавляем флаг, если вдруг захочешь отключить моки провайдеров (редко нужно)
    skipAuthMock = false,
    ...options
  } = {}
) => {
  let store;

  switch (storeType) {
    case 'tracks':
      store = createTestStoreWithTracks(preloadedState);
      break;
    default:
      store = createSimpleMockStore();
  }

  // ИСПРАВЛЕНИЕ ЗДЕСЬ: Добавляем MockAuthProvider и MockTokenProvider
  const Wrapper = ({ children }) => {
    if (skipAuthMock) {
      return (
        <ReduxProvider store={store}>
          <BrowserRouter initialEntries={initialEntries}>
            {children}
          </BrowserRouter>
        </ReduxProvider>
      );
    }

    return (
      <ReduxProvider store={store}>
        <BrowserRouter initialEntries={initialEntries}>
          {/* Эти провайдеры предотвращают ошибку "useAuth must be used within AuthProvider" */}
          <MockAuthProvider>
            <MockTokenProvider>{children}</MockTokenProvider>
          </MockAuthProvider>
        </BrowserRouter>
      </ReduxProvider>
    );
  };

  return render(ui, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react';
