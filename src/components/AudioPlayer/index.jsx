import React from 'react';
import * as S from './styles';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import {
  mixTrack,
  turnTrackPlaying,
  setIsPlaying,
  toggleTrackLike,
  addTrackToFavorite,
  removeTrackFromFavorite,
} from '../../store/trackSlice';

import TrackPlay from '../TrackPlay';
import SkelitonAudioPlay from '../SkelitonAudioPlayer';
import ProgressBar from '../ProgressBar';

export default function AudioPlayer() {
  const { user } = useAuth();
  const { isLoading, tracks } = useSelector((state) => state.storage);
  const currentTrackId = useSelector(
    (state) => state.storage.track.currentTrackId
  );
  const isPlaying = useSelector((state) => state.storage.track.isPlaying);
  const [volume, setVolume] = useState(0.7);
  const [isLoop, setLoop] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  // Инициализируем null, чтобы явно видеть отсутствие трека
  const [currentTrack, setCurrentTrack] = useState(null);

  const dispatch = useDispatch();
  const audioRef = useRef(null);

  // 1. Находим объект трека
  useEffect(() => {
    if (currentTrackId && tracks.length > 0) {
      const foundTrack = tracks.find((t) => t._id === currentTrackId);
      if (foundTrack) {
        setCurrentTrack(foundTrack);
      }
    } else {
      setCurrentTrack(null);
    }
  }, [currentTrackId, tracks]);

  // 2. Подготовка трека (SRC)
  // 2. Подготовка трека (Меняет SRC ТОЛЬКО если трек сменился!)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    // Получаем текущий src из аудио элемента
    const currentSrc = audio.src;
    const newSrc = currentTrack.track_file;

    // Если трек тот же самый (src совпадает) — выходим, чтобы не сбрасывать время и не перезагружать файл
    if (currentSrc === newSrc) {
      return;
    }

    // Если трек сменился:
    audio.currentTime = 0;
    audio.src = newSrc;

    const handleEnded = async () => {
      dispatch(setIsPlaying(false));
      dispatch(turnTrackPlaying({ next: true }));
    };

    const handleError = () => {
      console.error(
        'Ошибка загрузки:',
        currentTrack.name || 'Неизвестный трек'
      );
      dispatch(setIsPlaying(false));
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [currentTrack, dispatch]);

  // Автоплей при готовности файла
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    const onCanPlayThrough = async () => {
      try {
        await audio.play();
        dispatch(setIsPlaying(true));
      } catch (error) {
        if (error.name !== 'NotAllowedError') console.error(error);
      }
    };

    audio.addEventListener('canplaythrough', onCanPlayThrough, { once: true });
    return () => audio.removeEventListener('canplaythrough', onCanPlayThrough);
  }, [currentTrack, dispatch]);

  // Синхронизация кнопки Play/Pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => console.warn('Автоплей заблокирован браузером'));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Прогресс бар
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => audio.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  // --- Handlers ---

  const togglePlay = useCallback(() => {
    dispatch(setIsPlaying(!isPlaying));
  }, [isPlaying, dispatch]);

  const handleVolumeChange = useCallback((e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  }, []);

  const handleLoop = useCallback(() => {
    const newLoopState = !isLoop;
    setLoop(newLoopState);
    if (audioRef.current) audioRef.current.loop = newLoopState;
  }, [isLoop]);

  const handleLike = useCallback(async () => {
    if (!currentTrack) return;

    // 🔥 ГЛАВНАЯ ПРОВЕРКА
    if (!user) {
      return;
    }

    const { _id, trackLike } = currentTrack;

    // Локально переключаем сразу
    dispatch(toggleTrackLike({ trackId: _id }));

    try {
      if (!trackLike) {
        await dispatch(addTrackToFavorite({ trackId: _id })).unwrap();
      } else {
        await dispatch(removeTrackFromFavorite({ trackId: _id })).unwrap();
      }
    } catch (error) {
      console.error('Ошибка синхронизации лайка:', error);
      // Откатываем локальное состояние, если сервер упал
      dispatch(toggleTrackLike({ trackId: _id }));
    }
  }, [currentTrack, user, dispatch]); // user добавлен в зависимости!

  // 3. Функция шаффла (которую ESLint ругал за отсутствие)
  const handleShuffle = useCallback(() => {
    dispatch(mixTrack({ isMixing: true }));
  }, [dispatch]); // dispatch обязательно в зависимостях

  return (
    <S.StyledBar data-testid="audio-player">
      <audio ref={audioRef} loop={isLoop} />

      <S.StyledBarContent>
        <ProgressBar audio={audioRef.current} currentTime={currentTime} />

        <S.StyledBarPlayerBlock>
          <S.StyledBarBarPlayer>
            <S.StyledPlayerControls>
              <S.StyledPlayerBtnPrev>
                <S.StyledPlayerBtnPrevSvg
                  alt="prev"
                  onClick={() => dispatch(turnTrackPlaying({ next: false }))}
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
                  onClick={() => dispatch(turnTrackPlaying({ next: true }))}
                >
                  <use href="/img/icon/sprite.svg#icon-next" />
                </S.StyledPlayerBtnNextSvg>
              </S.StyledPlayerBtnNext>

              <S.StyledPlayerBtnRepeat>
                <S.StyledPlayerBtnRepeatSvg
                  alt="Включить повтор"
                  onClick={handleLoop}
                  style={{ opacity: isLoop ? 1 : 0.5 }}
                >
                  <use href="/img/icon/sprite.svg#icon-repeat" />
                </S.StyledPlayerBtnRepeatSvg>
              </S.StyledPlayerBtnRepeat>

              <S.StyledPlayerBtnShuffle>
                <S.StyledplayerBtnShuffleSvg
                  alt="shuffle"
                  onClick={handleShuffle}
                  style={{ opacity: isPlaying ? 1 : 0.5 }}
                >
                  <use href="/img/icon/sprite.svg#icon-shuffle" />
                </S.StyledplayerBtnShuffleSvg>
              </S.StyledPlayerBtnShuffle>
            </S.StyledPlayerControls>

            {isLoading ? (
              <SkelitonAudioPlay />
            ) : (
              // Безопасный доступ к данным трека
              <TrackPlay
                trackName={currentTrack?.name || 'Неизвестный трек'}
                trackAuthor={currentTrack?.author || 'Неизвестный автор'}
              />
            )}

            <S.StyledTrackPlayLikeDis>
              <S.StyledTrackPlayLike>
                <S.StyledTrackPlayLikeSvg
                  alt="like"
                  onClick={handleLike}
                  style={{
                    opacity: user ? 1 : 0.4,
                    cursor: user ? 'pointer' : 'not-allowed',

                    // Фильтр цвета (работает только если кнопка активна, но opacity все равно приглушит)
                    filter: currentTrack?.trackLike
                      ? 'brightness(0) invert(1)'
                      : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <use
                    href={
                      currentTrack?.trackLike
                        ? '/img/icon/sprite.svg#icon-like-press'
                        : '/img/icon/sprite.svg#icon-like'
                    }
                  />
                </S.StyledTrackPlayLikeSvg>
              </S.StyledTrackPlayLike>
            </S.StyledTrackPlayLikeDis>
          </S.StyledBarBarPlayer>

          <S.StyledBarVolumeBlock>
            <S.StyledVolumeContent>
              <S.StyledVolumeImage>
                <S.StyledVolumeSvg alt="volume">
                  <use href="/img/icon/sprite.svg#icon-volume" />
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
