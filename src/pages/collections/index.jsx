import React from 'react';
import PageLayout from '../../components/PageLayout';
import GenrePlayList from '../../components/GenrePlayList';
import Sidebar from '../../components/Sidebar';

export const Collections = (onAuthButtonClick) => {
  return (
    <div>
      <PageLayout
        onAuthButtonClick={onAuthButtonClick}
        Playlist={GenrePlayList}
        Sidebar={Sidebar}
      />
    </div>
  );
};
