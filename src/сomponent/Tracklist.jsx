import { PlaylistItem } from "./playlistItem";
import { SkeletonItem } from "./SkeletonItem";
import { SearchByMenu } from "./SearchByMenu";

const tracks = [
  {
    trackTitle: "Guilt",
    trackAuthor: "Nero",
    trackAlbum: "Welcome Reality",
    trackTime: "4:44",
  },
  {
    trackTitle: "Elektro",
    trackAuthor: "Dynoro, Outwork, Mr. Gee",
    trackAlbum: "Elektro",
    trackTime: "2:22",
  },
  {
    trackTitle: "I’m Fire",
    trackAuthor: "Ali Bakgor",
    trackAlbum: "I’m Fire",
    trackTime: "2:22",
  },
  {
    trackTitle: "Non Stop",
    trackAuthor: "Стоункат, Psychopath",
    trackAlbum: "Non Stop",
    trackTime: "4:12",
  },
  {
    trackTitle: "Run Run",
    trackSpanContent: "(feat. AR/CO)",
    trackAuthor: "Jaded, Will Clarke, AR/CO",
    trackAlbum: "Run Run",
    trackTime: "2:54",
  },
  {
    trackTitle: "Eyes on Fire",
    trackSpanContent: "(Zeds Dead Remix)",
    trackAuthor: "Blue Foundation, Zeds Dead",
    trackAlbum: "Eyes on Fire",
    trackTime: "5:20",
  },
  {
    trackTitle: "Mucho Bien",
    trackSpanContent: "(Hi Profile Remix)",
    trackAuthor: "HYBIT, Mr. Black, Offer Nissim, Hi Profile",
    trackAlbum: "Mucho Bien",
    trackTime: "3:41",
  },
  {
    trackTitle: "Knives n Cherries",
    trackAuthor: "minthaze",
    trackAlbum: "Captivating",
    trackTime: "1:48",
  },
  {
    trackTitle: "How Deep Is Your Love",
    trackAuthor: "Calvin Harris, Disciples",
    trackAlbum: "How Deep Is Your Love",
    trackTime: "3:32",
  },
  {
    trackTitle: "Morena",
    trackAuthor: "Tom Boxer",
    trackAlbum: "Soundz Made in Romania",
    trackTime: "3:36",
  },
];

export function TrackList({ isLoading }) {
  return (
    <div className="main__centerblock centerblock">
      <div className="centerblock__search search">
        <svg className="search__svg">
          <use href={`${"/img/icon/sprite.svg"}#icon-search`}></use>
        </svg>
        <input
          className="search__text"
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>
      <h2 className="centerblock__h2">Треки</h2>
      <SearchByMenu />

      <div className="centerblock__content">
        <div className="content__title playlist-title">
          <div className="playlist-title__col col01">Трек</div>
          <div className="playlist-title__col col02">ИСПОЛНИТЕЛЬ</div>
          <div className="playlist-title__col col03">АЛЬБОМ</div>
          <div className="playlist-title__col col04">
            <svg className="playlist-title__svg" alt="time">
              <use href={`${"/img/icon/sprite.svg"}#icon-watch`}></use>
            </svg>
          </div>
        </div>

        <div className="content__playlist playlist">
          {isLoading
            ? // Показываем 8 скелетонов (
              Array.from({ length: 8 }).map((_, index) => (
                <SkeletonItem key={index} />
              ))
            : // Показываем реальные треки
              tracks.map((track, index) => (
                <PlaylistItem
                  key={index}
                  trackTitle={track.trackTitle}
                  trackAuthor={track.trackAuthor}
                  trackAlbum={track.trackAlbum}
                  trackTime={track.trackTime}
                  sprite={"/img/icon/sprite.svg"}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
