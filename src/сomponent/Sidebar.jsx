import { SideBarPersonal } from "./sideBarPersonal";
import { SidebarItem } from "./sidebarItem";

export function Sidebar() {
  return (
    <div className="main__sidebar sidebar">
      <SideBarPersonal sprite={"/img/icon/sprite.svg"} />

      <div className="sidebar__block">
        <div className="sidebar__list">
          <SidebarItem playlist={"/img/playlist01.png"} link="#section" />
          <SidebarItem playlist={"/img/playlist02.png"} link="#section" />
          <SidebarItem playlist={"/img/playlist03.png"} link="#section" />
        </div>
      </div>
    </div>
  );
}
