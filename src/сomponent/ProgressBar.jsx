import { styled } from "styled-components";

const PRIMARY_COLOR = "#b672ff";

export const StyledProgressInput = styled.input`
  --progress-height: 8px;
  --progress-color: ${(props) => props.$color ?? PRIMARY_COLOR};
  --progress-bg-color: #2e2e2e;

  margin: 0;
  width: 100%;
  height: var(--progress-height);
  -webkit-appearance: none;
  cursor: pointer;
  background: transparent;
  position: relative;
  overflow: hidden;

  &::-webkit-slider-runnable-track {
    position: relative;
    height: var(--progress-height);
    background: var(--progress-bg-color);
  }
  &::-webkit-slider-thumb {
    position: relative;
    -webkit-appearance: none;
    width: 1px;
    height: 1px;
    box-shadow: calc(-100vmax - 1px) 0 0 100vmax var(--progress-color);
  }

  &::-moz-range-track {
    width: 100%;
    height: var(--progress-height);
    background: var(--progress-bg-color);
    border: none;
    border-radius: 0px;
  }
  &::-moz-range-thumb {
    border: none;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background: transparent;
  }
`;

export const StyledTime = styled.div`
  padding-right: 10px;
  position: absolute;
  top: -24px;
  right: 0;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #aaa;
  z-index: 1;
`;

export const StyledCurrentTime = styled.span`
  color: white;
`;

export const StyledAllTime = styled.span`
  color: ${PRIMARY_COLOR};
`;

// Функция форматирования времени (сек → MM:SS)
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export function ProgressBar({ audio, currentTime }) {
  if (!audio) {
    return null;
  }

  const duration = audio.duration || 0;

  // Прогресс в процентах
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Обработчик изменения слайдера
  const handleChange = (e) => {
    const percent = parseFloat(e.target.value);
    const newTime = (audio.duration * percent) / 100;
    audio.currentTime = newTime;
  };

  // Обработчик клика по треку (альтернативный способ перемотки)
  const handleMouseClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    const newTime = (audio.duration * percent) / 100;
    audio.currentTime = newTime;
  };

  return (
    <>
      <StyledTime>
        <StyledAllTime>{formatTime(duration)}</StyledAllTime>
        <span>/</span>
        <StyledCurrentTime>{formatTime(currentTime)}</StyledCurrentTime>
      </StyledTime>
      <StyledProgressInput
        type="range"
        min="0"
        max="100"
        value={progress.toFixed(1)}
        onChange={handleChange}
        step="0.1"
        $color={PRIMARY_COLOR}
        aria-label="Прогресс воспроизведения"
        onClick={handleMouseClick}
        onTouchMove={(e) => handleMouseClick(e.touches[0])}
      />
    </>
  );
}
