import React, { useState, useRef, useEffect } from "react";

import { TrackPlay } from "./TrackPlay";
import { SkelitonAudioPlay } from "./SkelitonAudioPlayer";
import styled from "styled-components";
import { ProgressBar } from "./ProgressBar";

const StyledBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(28, 28, 28, 0.5);
`;

const StyledBarContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledBarPlayerBlock = styled.div`
  height: 73px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledBarBarPlayer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const StyledPlayerControls = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 27px 0 31px;
`;

const StyledPlayerBtnPrev = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  margin-right: 23px;
`;

const StyledPlayerBtnPrevSvg = styled.svg`
  width: 15px;
  height: 14px;
  cursor: pointer;
`;

const StyledBtn = styled.div`
  cursor: pointer;
`;

const StyledPlayerBtnPlay = styled(StyledBtn)`
  padding: 5px;
  display: flex;
  align-items: center;
  margin-right: 23px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const StyledPlayerBtnPlaySvg = styled.svg`
  width: 22px;
  height: 20px;
  fill: #d9d9d9;
`;

const StyledPlayerBtnNext = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  margin-right: 28px;
  fill: #a53939;
`;

const StyledPlayerBtnNextSvg = styled.svg`
  width: 15px;
  height: 14px;
  fill: inherit;
  stroke: #d9d9d9;
  cursor: pointer;
`;

const StyledBtnIcon = styled.div`
  &:hover svg {
    fill: transparent;
    stroke: #acacac;
    cursor: pointer;
  }
  &:active svg {
    fill: transparent;
    stroke: #ffffff;
    cursor: pointer;
  }
`;

const StyledPlayerBtnRepeat = styled(StyledBtnIcon)`
  padding: 5px;
  display: flex;
  align-items: center;
  margin-right: 24px;
`;

const StyledPlayerBtnRepeatSvg = styled.svg`
  width: 18px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
`;

const StyledPlayerBtnShuffle = styled(StyledBtnIcon)`
  display: flex;
  align-items: center;
`;

const StyledplayerBtnShuffleSvg = styled.svg`
  width: 19px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
`;

const StyledTrackPlayLikeDis = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 26%;
`;

const StyledTrackPlayLike = styled(StyledBtnIcon)`
  padding: 5px;
`;

const StyledTrackPlayDisLike = styled(StyledBtnIcon)`
  padding: 5px;
  margin-left: 28.5px;
`;

const StyledTrackPlayLikeSvg = styled.svg`
  fill: #696969;
  stroke: #ffffff;
  cursor: pointer;
  width: 14px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
`;

const StyledTrackPlayDislikeSvg = styled.svg`
  fill: #696969;
  stroke: #ffffff;
  cursor: pointer;
  width: 14.34px;
  height: 13px;
  fill: transparent;
  stroke: #696969;
`;

const StyledBarVolumeBlock = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  padding: 0 92px 0 0;
`;

const StyledVolumeContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
`;

const StyledVolumeImage = styled.div`
  width: 13px;
  height: 18px;
  margin-right: 17px;
`;

const StyledVolumeSvg = styled.svg`
  width: 13px;
  height: 18px;
  margin-right: 17px;
`;

const StyledVolumeProgress = styled(StyledBtn)`
  width: 109px;
`;

const StyledVolumeProgressLine = styled.input`
  width: 109px;
`;

export function AudioPlayer({ isLoading, indexTrackPlaying, tracks }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoop, setLoop] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [pathTrakc, setpathTrakc] = useState(null);
  const [trakcName, setTrakcName] = useState(null);
  const [trackAuthor, setTrackAuthor] = useState(null);

  const audioRef = useRef(null);

  useEffect(() => {
    if (indexTrackPlaying !== null) {
      setpathTrakc(`/music/${indexTrackPlaying + 1}.mp3`);
    }
  }, [indexTrackPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !pathTrakc) return;

    audio.load();

    setTrakcName(tracks[indexTrackPlaying].trackTitle);
    setTrackAuthor(tracks[indexTrackPlaying].trackAuthor);

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Ошибка автовоспроизведения:", error);
      });
    }

    const handleError = () => {
      console.error("Не удалось загрузить трек:", pathTrakc);
    };
    audio.addEventListener("error", handleError);

    return () => audio.removeEventListener("error", handleError);
  }, [pathTrakc, isPlaying, indexTrackPlaying, tracks]);

  const handleStart = async () => {
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Ошибка воспроизведения:", error);
    }
  };

  const handleStop = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlay = (e) => {
    e.preventDefault();
    if (isLoading) return;
    isPlaying ? handleStop() : handleStart();
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleLoop = () => {
    setLoop((prev) => !prev);

    if (audioRef.current) {
      audioRef.current.loop = !isLoop;
    }
  };

  const handleNotWork = () => {
    const message = "Эта функция пока не реализована.";
    alert(message);
  };

  return (
    <StyledBar>
      <audio ref={audioRef}>
        {pathTrakc && <source src={pathTrakc} type="audio/mpeg" />}
      </audio>
      <StyledBarContent>
        <ProgressBar audio={audioRef.current} currentTime={currentTime} />
        <StyledBarPlayerBlock>
          <StyledBarBarPlayer>
            <StyledPlayerControls>
              <StyledPlayerBtnPrev>
                <StyledPlayerBtnPrevSvg alt="prev" onClick={handleNotWork}>
                  <use href="/img/icon/sprite.svg#icon-prev" />
                </StyledPlayerBtnPrevSvg>
              </StyledPlayerBtnPrev>
              <StyledPlayerBtnPlay disabled={isLoading}>
                <StyledPlayerBtnPlaySvg alt="play" onClick={togglePlay}>
                  <use
                    href={
                      isPlaying ? "/img/icon/pause.svg" : "/img/icon/play.svg"
                    }
                  />
                </StyledPlayerBtnPlaySvg>
              </StyledPlayerBtnPlay>
              <StyledPlayerBtnNext>
                <StyledPlayerBtnNextSvg alt="next" onClick={handleNotWork}>
                  <use href="/img/icon/sprite.svg#icon-next" />
                </StyledPlayerBtnNextSvg>
              </StyledPlayerBtnNext>
              <StyledPlayerBtnRepeat>
                <StyledPlayerBtnRepeatSvg
                  alt="Включить повтор"
                  onClick={handleLoop}
                >
                  <use
                    href="/img/icon/sprite.svg#icon-repeat"
                    stroke={isLoop ? "white" : "grey"}
                  />
                </StyledPlayerBtnRepeatSvg>
              </StyledPlayerBtnRepeat>
              <StyledPlayerBtnShuffle>
                <StyledplayerBtnShuffleSvg
                  alt="shuffle"
                  onClick={handleNotWork}
                >
                  <use href="/img/icon/sprite.svg#icon-shuffle" />
                </StyledplayerBtnShuffleSvg>
              </StyledPlayerBtnShuffle>
            </StyledPlayerControls>
            {isLoading ? (
              <SkelitonAudioPlay />
            ) : (
              <TrackPlay trakcName={trakcName} trackAuthor={trackAuthor} />
            )}
            <StyledTrackPlayLikeDis>
              <StyledTrackPlayLike>
                <StyledTrackPlayLikeSvg alt="like" onClick={handleNotWork}>
                  <use href="/img/icon/sprite.svg#icon-like" />
                </StyledTrackPlayLikeSvg>
              </StyledTrackPlayLike>
              <StyledTrackPlayDisLike>
                <StyledTrackPlayDislikeSvg
                  alt="dislike"
                  onClick={handleNotWork}
                >
                  <use href="/img/icon/sprite.svg#icon-dislike" />
                </StyledTrackPlayDislikeSvg>
              </StyledTrackPlayDisLike>
            </StyledTrackPlayLikeDis>
          </StyledBarBarPlayer>
          <StyledBarVolumeBlock>
            <StyledVolumeContent>
              <StyledVolumeImage>
                <StyledVolumeSvg alt="volume">
                  <use
                    href="/img/icon/sprite.svg#icon-volume"
                    onClick={handleNotWork}
                  />
                </StyledVolumeSvg>
              </StyledVolumeImage>
              <StyledVolumeProgress>
                <StyledVolumeProgressLine
                  type="range"
                  name="range"
                  value={volume}
                  min="0"
                  max="1"
                  step="0.01"
                  onChange={handleVolumeChange}
                />
              </StyledVolumeProgress>
            </StyledVolumeContent>
          </StyledBarVolumeBlock>
        </StyledBarPlayerBlock>
      </StyledBarContent>
    </StyledBar>
  );
}
