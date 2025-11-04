export function SideBarPersonal({ sprite }) {
  return (
    <div className="sidebar__personal">
      <p className="sidebar__personal-name">Sergey.Ivanov</p>
      <div className="sidebar__icon">
        <svg alt="logout">
          <use href={`${sprite}#logout`}></use>
        </svg>
      </div>
    </div>
  );
}
