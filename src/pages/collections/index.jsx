import { useParams } from "react-router-dom";
import PageLayout from "../../components/PageLayout";
import GenrePlayList from "../../components/GenrePlayList";
import Sidebar from "../../components/Sidebar";

export const Collections = (onAuthButtonClick) => {
  const params = useParams();
  return (
    <div>
      <PageLayout
        onAuthButtonClick={onAuthButtonClick}
        Playlist={GenrePlayList}
        Sidebar={Sidebar}
      />

      <h1> Collection № {params.id}</h1>
    </div>
  );
};
