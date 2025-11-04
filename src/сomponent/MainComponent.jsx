import { Navmenu } from "./NavMenu";
import { TrackList } from "./Tracklist";
import { AudioPlayer } from "./AudioPlayer";
import { Sidebar } from "./Sidebar.jsx";
import React, { useState, useEffect } from "react";

export function Main() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container">
      <main className="main">
        <Navmenu />
        <TrackList isLoading={isLoading} />
        <Sidebar isLoading={isLoading} />
      </main>
      <AudioPlayer isLoading={isLoading} />
      <footer className="footer"></footer>
    </div>
  );
}
