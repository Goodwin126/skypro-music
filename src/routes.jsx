import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/protected-route";
import { Main } from "./pages/main";
import { Login } from "./pages/login";
import { Collections } from "./pages/collections";
import { MyPlaylist } from "./pages/my-playlist";
import { Registration } from "./pages/registration";
import { NotFound } from "./pages/not-found";

export const AppRoutes = ({ user, onAuthButtonClick }) => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login user={user} onAuthButtonClick={onAuthButtonClick} />}
      ></Route>
      <Route path="/registration" element={<Registration />}></Route>

      <Route
        path="/collections/:id"
        element={
          <ProtectedRoute isAllowed={Boolean(user)}>
            <Collections />
          </ProtectedRoute>
        }
      ></Route>

      <Route
        path="/my-playlist"
        element={
          <ProtectedRoute isAllowed={Boolean(user)}>
            <MyPlaylist onAuthButtonClick={onAuthButtonClick} />
          </ProtectedRoute>
        }
      ></Route>

      <Route
        path="/*"
        element={
          <ProtectedRoute isAllowed={Boolean(user)}>
            <NotFound />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/"
        element={
          <ProtectedRoute isAllowed={Boolean(user)}>
            <Main onAuthButtonClick={onAuthButtonClick} />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
};
