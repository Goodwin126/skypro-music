import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import * as trackSlice from './store/trackSlice';
import { Provider as ReduxProvider } from 'react-redux';
import { AuthProvider } from './context/AuthContext';
import { TokenProvider } from './context/TokenContext';

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderApp = (initialEntries = ['/']) => {
    const initialState = {
      storage: {
        tracks: [],
        tracksSelection: [],
        currentPlaylist: [],
        track: { currentTrackId: null, isPlaying: false, isMixing: false },
        isLoading: false,
        error: null,
      },
    };

    const mockStore = {
      dispatch: () => {},
      getState: () => initialState,
      subscribe: () => () => {},
    };

    render(
      <ReduxProvider store={mockStore}>
        <MemoryRouter initialEntries={initialEntries}>
          <AuthProvider>
            <TokenProvider>
              <App />
            </TokenProvider>
          </AuthProvider>
        </MemoryRouter>
      </ReduxProvider>
    );

    return mockStore;
  };

  it('диспатчит loadTracks и loadTracksSelection при монтировании', async () => {
    const mockLoadTracks = vi.fn().mockResolvedValue('mocked-data');
    const mockLoadTracksSelection = vi
      .fn()
      .mockResolvedValue('mocked-selection');

    vi.spyOn(trackSlice, 'loadTracks').mockImplementation(mockLoadTracks);
    vi.spyOn(trackSlice, 'loadTracksSelection').mockImplementation(
      mockLoadTracksSelection
    );

    renderApp(['/']);

    await waitFor(() => {
      expect(mockLoadTracks).toHaveBeenCalledTimes(1);
      expect(mockLoadTracksSelection).toHaveBeenCalledTimes(3);
      const firstArg = mockLoadTracksSelection.mock.calls[0][0];
      expect(firstArg).toEqual({ Selection_Id: 2 });
    });
  });

  it('скрывает AudioPlayer на странице логина', async () => {
    renderApp(['/login']);

    await waitFor(() => {});

    expect(screen.queryByTestId('audio-player')).not.toBeInTheDocument();
  });

  it('отображает AudioPlayer на главной странице', async () => {
    renderApp(['/']);

    await waitFor(() => {
      expect(screen.getByTestId('audio-player')).toBeInTheDocument();
    });
  });
});
