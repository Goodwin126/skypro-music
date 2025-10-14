import "./css/App.css";
import { Navmenu } from "./сomponent/NavMenu";
import { TrackList } from "./сomponent/Tracklist";
import { AudioPlayer } from "./сomponent/AudioPlayer";
import { Sidebar } from "./сomponent/Sidebar.jsx";

function App() {
  return (
    <div className="App">
      <div className="wrapper">
        <div className="container">
          <main className="main">
            <Navmenu />
            <TrackList />
            <Sidebar />
          </main>
          <AudioPlayer />
          <footer className="footer"></footer>
        </div>
      </div>
    </div>
  );
}

export default App;
