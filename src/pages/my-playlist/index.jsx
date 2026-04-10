import PageLayout from "../../components/PageLayout";
import MyPlayList from "../../components/MyPlayList";
import Sidebar from "../../components/Sidebar";

export function MyPlaylist({ onAuthButtonClick }) {
  return (
    <PageLayout
      onAuthButtonClick={onAuthButtonClick}
      Playlist={MyPlayList}
      Sidebar={Sidebar}
    />
  );
}
