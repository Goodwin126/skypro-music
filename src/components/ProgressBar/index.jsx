import * as S from "./styles";

export default function ProgressBar({ audio, currentTime }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Если нет аудио или у него нет длительности — выходим (или рендерим только время 0:00 / 0:00)
  if (!audio || !audio.duration || audio.duration === Infinity) {
    return (
      <S.StyledTime>
        <S.StyledAllTime>{formatTime(0)}</S.StyledAllTime>
        <span>/</span>
        <S.StyledCurrentTime>{formatTime(0)}</S.StyledCurrentTime>
      </S.StyledTime>
    );
  }

  const duration = audio.duration;
  const progress = (currentTime / duration) * 100;

  const handleChange = (e) => {
    const percent = parseFloat(e.target.value);
    const newTime = (duration * percent) / 100;
    audio.currentTime = newTime;
  };

  const handleMouseClick = (e) => {
    if (!duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    const newTime = (duration * percent) / 100;
    
    // Защита от NaN
    if (!isNaN(newTime)) {
      audio.currentTime = newTime;
    }
  };

  return (
    <>
      <S.StyledTime>
        <S.StyledAllTime>{formatTime(duration)}</S.StyledAllTime>
        <span>/</span>
        <S.StyledCurrentTime>{formatTime(currentTime)}</S.StyledCurrentTime>
      </S.StyledTime>
      
      {/* Рендерим слайдер только если есть валидное аудио */}
      <S.StyledProgressInput
        type="range"
        min="0"
        max="100"
        value={progress.toFixed(1)}
        onChange={handleChange}
        step="0.1"
        color={S.PRIMARY_COLOR}
        aria-label="Прогресс воспроизведения"
        onClick={handleMouseClick}
        onTouchMove={(e) => handleMouseClick(e.touches[0])}
      />
    </>
  );
}
