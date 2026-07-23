import React from 'react';
import PageLayout from '../../components/PageLayout';
import TrackList from '../../components/TrackList';
import Sidebar from '../../components/Sidebar';

export function Main() {
  return <PageLayout Sidebar={Sidebar} Playlist={TrackList} />;
}
