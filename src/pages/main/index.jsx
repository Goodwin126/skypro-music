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
  const [indexTrackPlaying, setIndexTrackPlaying] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const tracks = [
    {
      trackTitle: "Guilt",
      trackAuthor: "Nero",
      trackAlbum: "Welcome Reality",
      trackTime: "4:44",
    },
    {
      trackTitle: "Electro",
      trackAuthor: "Dynoro, Outwork, Mr. Gee",
      trackAlbum: "Electro",
      trackTime: "2:22",
    },
    {
      trackTitle: "I’m Fire",
      trackAuthor: "Ali Bakgor",
      trackAlbum: "I’m Fire",
      trackTime: "2:22",
    },
  ];

  return (
    <StyledContainer>
      <StyledMain>
        <Navmenu onAuthButtonClick={onAuthButtonClick} />
        <TrackList
          isLoading={isLoading}
          setIndexTrackPlaying={setIndexTrackPlaying}
          indexTrackPlaying={indexTrackPlaying}
          tracks={tracks}
        />
        <Sidebar isLoading={isLoading} onAuthButtonClick={onAuthButtonClick} />
      </StyledMain>
      <AudioPlayer
        isLoading={isLoading}
        indexTrackPlaying={indexTrackPlaying}
        tracks={tracks}
      />
      <footer className="footer"></footer>
    </StyledContainer>
  );
}
