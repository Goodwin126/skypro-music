import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {
  GlobalStyles,
  Wrapper,
  MainContent,
} from './components/AppLayout/styles';
import { AppRoutes } from './routes';
import AudioPlayer from './components/AudioPlayer';
import { loadTracks } from './store/trackSlice';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTracks());
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
