import React from 'react';
import { render } from '@testing-library/react';
import TrackList from './index';

vi.mock('./styles', () => ({
  StyledMainCenterblock: 'div',
  StyledCenterblockSearch: 'div',
  StyledSearchSvg: 'svg',
  StyledSearchText: 'input',
  StyledCenterblockH2: 'h2',
  StyledCenterblockContent: 'div',
  StyledContentTitle: 'div',
  StyledCol01: 'div',
  StyledCol02: 'div',
  StyledCol03: 'div',
  StyledCol04: 'div',
  StyledplaylistTitleSvg: 'svg',
  StyledContentPlaylist: 'div',
}));

vi.mock('../PlaylistItem', () => ({
  default: (props) => <div {...props}>Mock PlaylistItem</div>,
}));

vi.mock('../SkeletonItem', () => ({
  default: () => <div>Mock SkeletonItem</div>,
}));

vi.mock('../SearchByMenu', () => ({
  default: () => <div>Mock SearchByMenu</div>,
}));

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

import { useSelector, useDispatch } from 'react-redux';

vi.mock('../../context/AuthContext', () => ({
  useAuth: vi.fn(() => ({ user: {} })),
}));

describe('TrackList (simple test)', () => {
  beforeEach(() => {
    // 1. Настраиваем useSelector
    useSelector.mockImplementation((selector) =>
      selector({
        storage: {
          tracks: [],
          isLoading: false,
          isMyTracks: false,
          track: {
            trackPlaying: null,
            isPlaying: false,
          },
        },
      })
    );

    useDispatch.mockReturnValue(vi.fn());
  });

  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
  });

  it('отрисовывает компонент без ошибок', () => {
    expect(() => {
      render(<TrackList />);
    }).not.toThrow();
  });
});
