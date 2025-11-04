export function SkeletonItem() {
  return (
    <div className="playlist__item">
      <div className="playlist__track track">
        <div className="track__title">
          <div className="track__title-image">
            <svg className="track__title-svg" alt="music">
              <img alt="square" src="/img/skelitons/Skeleton_square.svg" />
            </svg>
          </div>
          <div className="track__title-text">
            <img alt="square" src="/img/skelitons/Skeleton_rectangle01.svg" />
          </div>
        </div>
        <div className="track__author">
          <img alt="square" src="/img/skelitons/Skeleton_rectangle02.svg" />
        </div>
        <div className="track__album">
          <img alt="square" src="/img/skelitons/Skeleton_rectangle03.svg" />
        </div>
      </div>
    </div>
  );
}
