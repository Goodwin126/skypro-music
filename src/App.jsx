import React, { use } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';

import {
  GlobalStyles,
  Wrapper,
  MainContent,
} from './components/AppLayout/styles';
import { AppRoutes } from './routes';
import AudioPlayer from './components/AudioPlayer';
import {
  loadTracks,
  loadTracksSelection,
  loadFavoriteTracks,
} from './store/trackSlice';

function App() {
  const { login: authLogin } = useAuth();

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTracks());

    const user = localStorage.getItem('user');

    if (user !== null) {
      const jsonString = JSON.parse(user);
      authLogin(jsonString);
      dispatch(loadFavoriteTracks());
    }
  }, [dispatch]);
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <MainContent>
          <AppRoutes />
        </MainContent>

        {!['/login', '/registration'].includes(location.pathname) && (
          <AudioPlayer />
        )}
      </Wrapper>
    </>
  );
}

export default App;
