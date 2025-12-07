import { Navmenu } from "../../сomponent/NavMenu";
import { TrackList } from "../../сomponent/Tracklist";
import { AudioPlayer } from "../../сomponent/AudioPlayer";
import { Sidebar } from "../../сomponent/Sidebar.jsx";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  max-width: 1920px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: #181818;
`;

const StyledMain = styled.main`
  flex: 1 1 auto;
  display: flex;
  justify-content: space-between;
`;

export function Main({ onAuthButtonClick }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <StyledContainer>
      <StyledMain>
        <Navmenu onAuthButtonClick={onAuthButtonClick} />
        <TrackList isLoading={isLoading} />
        <Sidebar isLoading={isLoading} onAuthButtonClick={onAuthButtonClick} />
      </StyledMain>
      <AudioPlayer isLoading={isLoading} />
      <footer className="footer"></footer>
    </StyledContainer>
  );
}
