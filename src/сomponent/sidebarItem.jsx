export function SidebarItem({ playlist, link }) {
  return (
    <div className="sidebar__item">
      <a className="sidebar__link" href={link}>
        <img className="sidebar__img" src={playlist} alt="day's playlist" />
      </a>
    </div>
  );
}
