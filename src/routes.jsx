import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Main } from './pages/main';
import { Login } from './pages/login';
import { Collections } from './pages/collections';
import { MyPlaylist } from './pages/my-playlist';
import { Registration } from './pages/registration';
import { NotFound } from './pages/not-found';

export const AppRoutes = ({ user, onAuthButtonClick }) => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login user={user} onAuthButtonClick={onAuthButtonClick} />}
      />

      <Route path="/registration" element={<Registration />} />
      <Route
        path="/collections/:id"
        element={<Collections onAuthButtonClick={onAuthButtonClick} />}
      />

      <Route
        path="/my-playlist"
        element={<MyPlaylist onAuthButtonClick={onAuthButtonClick} />}
      />

      {/* 🔥 Для главной и 404 тоже убираем защиту */}
      <Route path="/*" element={<NotFound />} />

      <Route
        path="/"
        element={<Main onAuthButtonClick={onAuthButtonClick} />}
      />
    </Routes>
  );
};
