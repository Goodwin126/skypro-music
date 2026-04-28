import * as S from "./styles";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  mixTrack,
  turnTrackPlaying,
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
  const [pathTrack, setPathTrack] = useState(null);

  //состояние микса треков
  const [isMixing, setIsMixing] = useState(false);

  // состояние громкости
  const [volume, setVolume] = useState(0.7);

  // состояние зациклености
  const [isLoop, setLoop] = useState(false);

  //  состояние время проигрывания трека
  const [currentTime, setCurrentTime] = useState(0);

  //  //  состояние время паузы трека
  // const [currentTime, setCurrentTime] = useState(0);

  // состояние названия трека
  const [trackName, setTrackName] = useState("Неизвестный трек"); // инициализируем значением по умолчанию
  // состояние автора трека
  const [trackAuthor, setTrackAuthor] = useState("Неизвестный автор"); // инициализируем значением по умолчанию

  // Сохраняем currentTrack в состоянии
  const [currentTrack, setCurrentTrack] = useState(null);

  const dispatch = useDispatch();

  const audioRef = useRef(null);

  const nameTrackPlaying = useSelector(
    (state) => state.storage.track.trackPlaying,
  );

  // обновляем currentTrack при смене nameTrackPlaying
  useMemo(() => {
    if (tracks.length === 0) return;
    const foundTrack = tracks.find(
      (track) => track.trackName === nameTrackPlaying,
    );
    setCurrentTrack(foundTrack);
  }, [tracks, nameTrackPlaying]);

  // логика загрузки и настройки трека
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !nameTrackPlaying) return;

    // обновляем путь к треку
    const newPath = `/music/${nameTrackPlaying}.mp3`;
    setPathTrack(newPath);

    // загружаем новый трек
    audio.src = newPath;

    const handleEnded = () => {
      dispatch(turnTrackPlaying({ next: true })); // переходим к следующему треку
    };
    const handleCanPlay = async () => {
      try {
        await audio.play();
      } catch (err) {
        console.error("Не удалось запустить воспроизведение:", err);
        dispatch(setIsPlaying(false));
      }
    };

    const handleError = () => {
      console.error("Не удалось загрузить трек:", newPath);
      dispatch(setIsPlaying(false));
    };

    // подключаем обработчики
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("error", handleError);

    // очистка обработчиков при смене трека или размонтировании
    return () => {
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("error", handleError);
    };
  }, [nameTrackPlaying, dispatch]);

  // обновление метаданных — зависит от currentTrack
  useEffect(() => {
    if (!currentTrack) return;
    // обновляем метаданные только при наличии трека
    setTrackName(currentTrack.trackTitle ?? "Неизвестный трек");
    setTrackAuthor(currentTrack.trackAuthor ?? "Неизвестный автор");
  }, [currentTrack]);
  // независимое управление воспроизведением
  const handlePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !pathTrack) return; // проверяем наличие трека

    try {
      // Сначала ждём готовности аудио
      await new Promise((resolve) => {
        const onCanPlay = () => {
          audio.removeEventListener("canplaythrough", onCanPlay);
          resolve();
        };
        audio.addEventListener("canplaythrough", onCanPlay);

        // Если уже готово, сразу разрешаем
        if (audio.readyState >= 3) {
          resolve();
        }
      });

      // Теперь устанавливаем время и запускаем воспроизведение
      if (currentTime !== 0) {
        audio.currentTime = currentTime;
      }
      await audio.play();
      dispatch(setIsPlaying(true));
    } catch (err) {
      console.error("Ошибка воспроизведения:", err);
      dispatch(setIsPlaying(false));
    }
  }, [pathTrack, dispatch, currentTime]);

  const handlePause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Сначала считываем текущее время ДО паузы
    const current = audio.currentTime;
    setCurrentTime(current); // Сохраняем в состояние
    audio.pause(); // Ставим на паузу
    dispatch(setIsPlaying(false)); // Обновляем состояние проигрывания
  }, [dispatch]);

  // переключение между play/pause
  const togglePlay = useCallback(() => {
    isPlaying ? handlePause() : handlePlay();
  }, [isPlaying, handlePlay, handlePause]);

  // обработчик изменения времени
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      // Только если аудио активно воспроизводится
      if (!isPlaying) return;
      setCurrentTime(audio.currentTime);
    };
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, [isPlaying]);

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
        <source src={pathTrack} type="audio/mpeg" />
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
                    dispatch(turnTrackPlaying({ next: false }));
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
                    dispatch(turnTrackPlaying({ next: true }));
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
                    dispatch(mixTrack({ isMixing }));
                    setIsMixing(!isMixing);
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
              <TrackPlay trackName={trackName} trackAuthor={trackAuthor} />
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
