import React from 'react';
import * as S from './styles';
import { styled, keyframes, css } from 'styled-components';

export const pulseAnimation = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
    animation-timing-function: ease-in-out;
  }
  50% {
    opacity: 0.3;
    transform: scale(0.8);
    animation-timing-function: ease-in-out;
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
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
}) {
  const formatTime = (seconds) => {
    if (typeof seconds !== 'number' || seconds < 0) return '0:00';

    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    // Добавляем ведущий ноль для секунд, если они меньше 10
    const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;

    return `${minutes}:${formattedSecs}`;
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
          <S.StyledTrackTimeSvg alt="time" onClick={onClickLike}>
            {trackLike ? (
              <use href="/img/icon/sprite.svg#icon-like-press" />
            ) : (
              <use href="/img/icon/sprite.svg#icon-like" />
            )}
          </S.StyledTrackTimeSvg>
          <S.StyledtrackTimeText>{formatTime(trackTime)}</S.StyledtrackTimeText>
        </S.StyledTrackTime>
      </S.StyledPlaylistTrack>
    </S.StyledPlaylistItem>
  );
}
