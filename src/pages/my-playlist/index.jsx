import PageLayout from "../../components/PageLayout";
import MyPlayList from "../../components/MyPlayList";
import Sidebar from "../../components/Sidebar";

export function MyPlaylist() {
  return <PageLayout Playlist={MyPlayList} Sidebar={Sidebar} />;
}
