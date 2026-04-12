import * as S from "./styles";

export default function ProgressBar({ audio, currentTime }) {
  // Функция форматирования времени (сек → MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };
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
      <S.StyledTime>
        <S.StyledAllTime>{formatTime(duration)}</S.StyledAllTime>
        <span>/</span>
        <S.StyledCurrentTime>{formatTime(currentTime)}</S.StyledCurrentTime>
      </S.StyledTime>
      <S.StyledProgressInput
        type="range"
        min="0"
        max="100"
        value={progress.toFixed(1)}
        onChange={handleChange}
        step="0.1"
        $color={S.PRIMARY_COLOR}
        aria-label="Прогресс воспроизведения"
        onClick={handleMouseClick}
        onTouchMove={(e) => handleMouseClick(e.touches[0])}
      />
    </>
  );
}
