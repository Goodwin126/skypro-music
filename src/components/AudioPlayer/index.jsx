import * as S from "./styles";
import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  mixTrack,
  turnTrackTrackPlaying,
  setIsPlaying,
} from "../../store/trackSlice";

import TrackPlay from "../TrackPlay";
import SkelitonAudioPlay from "../SkelitonAudioPlayer";
import ProgressBar from "../ProgressBar";

export default function AudioPlayer() {
  //состояние згрузки и треки
  const { isLoading, tracks } = useSelector((state) => state.storage);

  //состояние проигрывания
  const isPlaying = useSelector((state) => state.storage.track.isPlaying);

  //состояние путь к треку
  const [PathTrack, setPathTrack] = useState(null);

  //состояние микса треков
  const [isMixing, setIsMixing] = useState(false);

  // состояние громкости
  const [volume, setVolume] = useState(0.7);

  // состояние зациклености
  const [isLoop, setLoop] = useState(null);

  //  состояние загрузки
  const [currentTime, setCurrentTime] = useState(0);

  // //состояние название трека
  const [trackName, setTrackName] = useState(null);
  // //состояние автор трека
  const [trackAuthor, setTrackAuthor] = useState(null);
  //состояние автор трека

  const dispatch = useDispatch();

  const audioRef = useRef(null);

  const nameTrackPlaying = useSelector(
    (state) => state.storage.track.trackPlaying,
  );

  useEffect(() => {
    if (isLoading || tracks.length === 0) return;

    const audio = audioRef.current;
    if (!audio) return;

    if (nameTrackPlaying === null) return;

    const currentTrack = tracks.find(
      (track) => track.trackName === nameTrackPlaying,
    );

    // Обновляем путь к треку
    const newPath = `/music/${nameTrackPlaying}.mp3`;
    setPathTrack(newPath);

    // Обновляем метаданные
    setTrackName(currentTrack.trackTitle ?? "Неизвестный трек");
    setTrackAuthor(currentTrack.trackAuthor ?? "Неизвестный автор");

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
  }, [isLoading, tracks, nameTrackPlaying, dispatch]);

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

  // Синхронизация loop с аудио
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLoop;
    }
  }, [isLoop]);

  return (
    <S.StyledBar>
      <audio ref={audioRef}>
        <source src={PathTrack} type="audio/mpeg" />
      </audio>
      <S.StyledBarContent>
        <ProgressBar audio={audioRef.current} currentTime={currentTime} />
        <S.StyledBarPlayerBlock>
          <S.StyledBarBarPlayer>
            <S.StyledPlayerControls>
              <S.StyledPlayerBtnPrev>
                <S.StyledPlayerBtnPrevSvg
                  alt="prev"
                  onClick={() => {
                    dispatch(turnTrackTrackPlaying({ next: false }));
                  }}
                >
                  <use href="/img/icon/sprite.svg#icon-prev" />
                </S.StyledPlayerBtnPrevSvg>
              </S.StyledPlayerBtnPrev>
              <S.StyledPlayerBtnPlay disabled={isLoading}>
                <S.StyledPlayerBtnPlaySvg alt="play" onClick={togglePlay}>
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
                </S.StyledPlayerBtnPlaySvg>
              </S.StyledPlayerBtnPlay>
              <S.StyledPlayerBtnNext>
                <S.StyledPlayerBtnNextSvg
                  alt="next"
                  onClick={() => {
                    dispatch(turnTrackTrackPlaying({ next: true }));
                  }}
                >
                  <use href="/img/icon/sprite.svg#icon-next" />
                </S.StyledPlayerBtnNextSvg>
              </S.StyledPlayerBtnNext>
              <S.StyledPlayerBtnRepeat>
                <S.StyledPlayerBtnRepeatSvg
                  alt="Включить повтор"
                  onClick={handleLoop}
                >
                  <use
                    href="/img/icon/sprite.svg#icon-repeat"
                    stroke={isLoop ? "white" : "grey"}
                  />
                </S.StyledPlayerBtnRepeatSvg>
              </S.StyledPlayerBtnRepeat>
              <S.StyledPlayerBtnShuffle>
                <S.StyledplayerBtnShuffleSvg
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
                </S.StyledplayerBtnShuffleSvg>
              </S.StyledPlayerBtnShuffle>
            </S.StyledPlayerControls>
            {isLoading ? (
              <SkelitonAudioPlay />
            ) : (
              <TrackPlay trakcName={trackName} trackAuthor={trackAuthor} />
            )}
            <S.StyledTrackPlayLikeDis>
              <S.StyledTrackPlayLike>
                <S.StyledTrackPlayLikeSvg alt="like" onClick={handleNotWork}>
                  <use href="/img/icon/sprite.svg#icon-like" />
                </S.StyledTrackPlayLikeSvg>
              </S.StyledTrackPlayLike>
              <S.StyledTrackPlayDisLike>
                <S.StyledTrackPlayDislikeSvg
                  alt="dislike"
                  onClick={handleNotWork}
                >
                  <use href="/img/icon/sprite.svg#icon-dislike" />
                </S.StyledTrackPlayDislikeSvg>
              </S.StyledTrackPlayDisLike>
            </S.StyledTrackPlayLikeDis>
          </S.StyledBarBarPlayer>
          <S.StyledBarVolumeBlock>
            <S.StyledVolumeContent>
              <S.StyledVolumeImage>
                <S.StyledVolumeSvg alt="volume">
                  <use
                    href="/img/icon/sprite.svg#icon-volume"
                    onClick={handleNotWork}
                  />
                </S.StyledVolumeSvg>
              </S.StyledVolumeImage>
              <S.StyledVolumeProgress>
                <S.StyledVolumeProgressLine
                  type="range"
                  name="range"
                  value={volume}
                  min="0"
                  max="1"
                  step="0.01"
                  onChange={handleVolumeChange}
                />
              </S.StyledVolumeProgress>
            </S.StyledVolumeContent>
          </S.StyledBarVolumeBlock>
        </S.StyledBarPlayerBlock>
      </S.StyledBarContent>
    </S.StyledBar>
  );
}
