import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  mixTrack,
  turnTrackTrackPlaying,
  setIsPlaying,
} from "../store/trackSlice";

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

export function AudioPlayer({ isLoading }) {
  //состояние проигрывания
  const isPlaying = useSelector((state) => state.track.isPlaying);

  //состояние микса треков
  const [isMixing, setIsMixing] = useState(false);

  // состояние громкости
  const [volume, setVolume] = useState(0.7);
  // состояние зациклености
  const [isLoop, setLoop] = useState(null);
  //  состояние загрузки
  const [currentTime, setCurrentTime] = useState(0);
  //состояние путь к треку
  const [pathTrakc, setpathTrakc] = useState(null);
  //состояние название трека
  const [trakcName, setTrakcName] = useState(null);
  //состояние автор трека
  const [trackAuthor, setTrackAuthor] = useState(null);
  //состояние автор трека

  const dispatch = useDispatch();

  const tracks = useSelector((state) => state.track.tracks);

  const nameTrackPlaying = useSelector((state) => state.track.trackPlaying);

  const audioRef = useRef(null);

  // Синхронизация loop с аудио
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLoop;
    }
  }, [isLoop]);

  useEffect(() => {
    if (nameTrackPlaying === null) return;

    const currentTrack = tracks.find(
      (track) => track.trackName === nameTrackPlaying,
    );

    const audio = audioRef.current;
    if (!audio) return;

    // Обновляем путь к треку
    const newPath = `/music/${nameTrackPlaying}.mp3`;
    setpathTrakc(newPath);

    // Обновляем метаданные
    setTrakcName(currentTrack.trackTitle);
    setTrackAuthor(currentTrack.trackAuthor);

    // Загружаем новый трек
    audio.src = newPath;

    const handleEnded = () => {
      dispatch(turnTrackTrackPlaying({ next: true })); // Переходим к следующему треку
    };

    audio.addEventListener("ended", handleEnded);

    // Обработчик для автоматического старта после загрузки
    const handleCanPlay = async () => {
      try {
        await audio.play();
        dispatch(setIsPlaying(true));
      } catch (err) {
        console.error("Не удалось запустить воспроизведение:", err);
        dispatch(setIsPlaying(false));
      }
    };

    // Обработчик ошибок
    const handleError = () => {
      console.error("Не удалось загрузить трек:", newPath);
      dispatch(setIsPlaying(false));
    };

    // Подключаем обработчики
    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("error", handleError);

    // Очистка обработчиков при смене трека или размонтировании
    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("error", handleError);
    };
  }, [nameTrackPlaying, tracks, dispatch]);

  // Управление воспроизведением
  const handlePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      dispatch(setIsPlaying(true));
    } catch (err) {
      console.error("Ошибка воспроизведения:", err);
      dispatch(setIsPlaying(false));
    }
  }, [dispatch]);

  const handlePause = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      dispatch(setIsPlaying(false));
    }
  }, [dispatch]);

  // Переключение между play/pause
  const togglePlay = useCallback(
    (e) => {
      e.preventDefault();
      if (isLoading) return;
      isPlaying ? handlePause() : handlePlay();
    },
    [isPlaying, isLoading, handlePlay, handlePause],
  );

  // Обработчик изменения времени
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  // Обработка громкости
  const handleVolumeChange = useCallback((e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  // Обработка зацикливания
  const handleLoop = useCallback(() => {
    setLoop((prev) => !prev);
  }, []);

  // Заглушка для нереализованных функций
  const handleNotWork = useCallback(() => {
    alert("Эта функция пока не реализована.");
  }, []);

  return (
    <StyledBar>
      <audio ref={audioRef}>
        <source src={pathTrakc} type="audio/mpeg" />
      </audio>
      <StyledBarContent>
        <ProgressBar audio={audioRef.current} currentTime={currentTime} />
        <StyledBarPlayerBlock>
          <StyledBarBarPlayer>
            <StyledPlayerControls>
              <StyledPlayerBtnPrev>
                <StyledPlayerBtnPrevSvg
                  alt="prev"
                  onClick={() => {
                    dispatch(turnTrackTrackPlaying({ next: false }));
                  }}
                >
                  <use href="/img/icon/sprite.svg#icon-prev" />
                </StyledPlayerBtnPrevSvg>
              </StyledPlayerBtnPrev>
              <StyledPlayerBtnPlay disabled={isLoading}>
                <StyledPlayerBtnPlaySvg alt="play" onClick={togglePlay}>
                  {isPlaying ? (
                    <svg
                      width="15"
                      height="19"
                      viewBox="0 0 15 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="5" height="19" fill="#D9D9D9" />
                      <rect x="10" width="5" height="19" fill="#D9D9D9" />
                    </svg>
                  ) : (
                    <path
                      d="M15 9.52628L-1.01012e-06 -4.47037e-06L-1.84293e-06 19.0526L15 9.52628Z"
                      fill="#D9D9D9"
                    />
                  )}
                </StyledPlayerBtnPlaySvg>
              </StyledPlayerBtnPlay>
              <StyledPlayerBtnNext>
                <StyledPlayerBtnNextSvg
                  alt="next"
                  onClick={() => {
                    dispatch(turnTrackTrackPlaying({ next: true }));
                  }}
                >
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
                  onClick={() => {
                    setIsMixing(!isMixing);
                    dispatch(mixTrack({ isMixing }));
                  }}
                >
                  <use
                    href="/img/icon/sprite.svg#icon-shuffle"
                    stroke={isMixing ? "white" : "grey"}
                  />
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
