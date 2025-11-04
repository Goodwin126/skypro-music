export function PlaylistItem({
  trackTitle,
  trackAuthor,
  trackAlbum,
  trackTime,
  trackSpanContent,
  sprite,
}) {
  return (
    <div className="playlist__item">
      <div className="playlist__track track">
        <div className="track__title">
          <div className="track__title-image">
            <svg className="track__title-svg" alt="music">
              <use href={`${"/img/icon/sprite.svg"}#icon-note`}></use>
            </svg>
          </div>
          <div className="track__title-text">
            <a className="track__title-link" href="http://">
              {trackTitle}
              <span className="track__title-span">{trackSpanContent}</span>
            </a>
          </div>
        </div>
        <div className="track__author">
          <a className="track__author-link" href="http://">
            {trackAuthor}
          </a>
        </div>
        <div className="track__album">
          <a className="track__album-link" href="http://">
            {trackAlbum}
          </a>
        </div>
        <div className="track__time">
          <svg className="track__time-svg" alt="time">
            <use href={`${"/img/icon/sprite.svg"}#icon-like`}></use>
          </svg>
          <span className="track__time-text">{trackTime}</span>
        </div>
      </div>
    </div>
  );
}
