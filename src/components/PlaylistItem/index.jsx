import React, { useState } from 'react';
import * as S from './styles';
import { styled, keyframes, css } from 'styled-components';

export const pulseAnimation = keyframes`
  0% { opacity: 1; transform: scale(1); animation-timing-function: ease-in-out; }
  50% { opacity: 0.3; transform: scale(0.8); animation-timing-function: ease-in-out; }
  100% { opacity: 1; transform: scale(1); }
`;

export const StyledAnimatedSvg = styled.svg`
  display: block;
  width: 12px;
  height: 12px;
  fill: transparent;
  margin: 0 auto;
  transform-origin: center center;

  ${(props) =>
    props.$animate &&
    css`
      animation: ${pulseAnimation} 0.7s infinite;
      animation-play-state: ${props.$isPlaying ? 'running' : 'paused'};
      will-change: transform, opacity;
    `}
`;

export default function PlaylistItem({
  trackName,
  trackAuthor,
  trackAlbum,
  trackTime,
  trackLike,
  trackSpanContent,
  animate,
  isPlaying,
  sprite,
  onClickPlay,
  onClickLike,
  isAuthorized,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const formatTime = (seconds) => {
    if (typeof seconds !== 'number' || seconds < 0) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;
    return `${minutes}:${formattedSecs}`;
  };

  const handleLikeClick = () => {
    // Блокируем только действие клика, если нет авторизации.
    // Наведение (hover) мы оставляем доступным, чтобы показать подсказку!
    if (!isAuthorized) {
      return;
    }
    onClickLike();
  };

  return (
    <S.StyledPlaylistItem>
      <S.StyledPlaylistTrack>
        <S.StyledTrackTitle>
          <S.StyledTrackTitleImage>
            <S.StyledTrackTitleSvg aria-label="Иконка трека">
              <StyledAnimatedSvg $animate={animate} $isPlaying={isPlaying}>
                {sprite === 'current-track-play' ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z"
                      fill="#B672FF"
                    />
                  </svg>
                ) : (
                  <svg>
                    <use href={sprite} />
                  </svg>
                )}
              </StyledAnimatedSvg>
            </S.StyledTrackTitleSvg>
          </S.StyledTrackTitleImage>

          <S.StyledTrackTitleText>
            <S.StyledTrackTitleLink onClick={onClickPlay}>
              {trackName}
              <S.StyledTrackTitleSpan>
                {trackSpanContent}
              </S.StyledTrackTitleSpan>
            </S.StyledTrackTitleLink>
          </S.StyledTrackTitleText>
        </S.StyledTrackTitle>

        <S.StyledTrackAuthor>
          <S.StyledTrackAuthorLink href="/">
            {trackAuthor}
          </S.StyledTrackAuthorLink>
        </S.StyledTrackAuthor>

        <S.StyledtrackAlbum>
          <S.StyledTrackAlbumLink href="/">{trackAlbum}</S.StyledTrackAlbumLink>
        </S.StyledtrackAlbum>

        <S.StyledTrackTime>
          {/* Контейнер-обертка для позиционирования тултипа */}
          <div
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <S.StyledTrackTimeSvg
              alt="like"
              onClick={handleLikeClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                cursor: isAuthorized ? 'pointer' : 'not-allowed',
                opacity: isAuthorized ? 1 : 0.6,
                pointerEvents: 'auto',
              }}
              aria-label={
                isAuthorized ? 'Поставить лайк' : 'Требуется авторизация'
              }
            >
              {trackLike ? (
                <svg
                  width="14"
                  height="12"
                  viewBox="0 0 15 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.52154 12.4999C13.402 8.99988 16.4673 3.70909 13.1127 1.26722C10.9125 -0.334357 8.45343 0.941632 7.52154 1.75559H7.50003H7.49997H7.47846C6.54657 0.941632 4.08746 -0.334357 1.88727 1.26722C-1.4673 3.70909 1.59797 8.99988 7.47846 12.4999H7.49997H7.50003H7.52154Z"
                    fill="#B672FF"
                  />
                  <path
                    d="M7.49997 1.75559H7.52154C8.45343 0.941632 10.9125 -0.334357 13.1127 1.26722C16.4673 3.70909 13.402 8.99988 7.52154 12.4999H7.49997M7.50003 1.75559H7.47846C6.54657 0.941632 4.08746 -0.334357 1.88727 1.26722C-1.4673 3.70909 1.59797 8.99988 7.47846 12.4999H7.50003"
                    stroke="#B672FF"
                  />
                </svg>
              ) : (
                <use href="/img/icon/sprite.svg#icon-like" />
              )}
            </S.StyledTrackTimeSvg>

            {/* ТУЛТИП */}
            {!isAuthorized && isHovered && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '25px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#333',
                  color: '#fff',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  opacity: 1,
                  transition: 'opacity 0.2s',
                  zIndex: 9999,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                }}
              >
                Требуется авторизация
              </div>
            )}
          </div>

          <S.StyledtrackTimeText>{formatTime(trackTime)}</S.StyledtrackTimeText>
        </S.StyledTrackTime>
      </S.StyledPlaylistTrack>
    </S.StyledPlaylistItem>
  );
}
