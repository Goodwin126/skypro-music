import PageLayout from "../../components/PageLayout";
import TrackList from "../../components/TrackList";
import Sidebar from "../../components/Sidebar";

export function Main({ onAuthButtonClick }) {
  return (
    <PageLayout
      onAuthButtonClick={onAuthButtonClick}
      Sidebar={Sidebar}
      Playlist={TrackList}
    />
  );
}
