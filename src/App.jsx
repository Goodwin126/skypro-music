import { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { AppRoutes } from "./routes";
import AudioPlayer from "./components/AudioPlayer";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { loadTracks } from "./store/trackSlice";

import { useRefreshTokenDataMutation } from "./services/enter";

const GlobalStyle = createGlobalStyle`
  /* Сброс базовых стилей */
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  &:before,
  &:after {
    box-sizing: border-box;
  }

  /* Подключение шрифта */
  @font-face {
    font-family: "StratosSkyeng";
    src: url("/fonts/StratosSkyeng.woff2") format("woff2"),
         url("/fonts/StratosSkyeng.woff") format("woff");
    font-weight: 400;
    font-style: normal;
  }

  /* Стили для html/body */
  html,
  body {
    width: 100%;
    height: 100%;
    font-family: "StratosSkyeng", sans-serif;
    color: #ffffff;
  }

  /* Общие стили для элементов */
  a,
  a:visited {
    text-decoration: none;
    font-family: "StratosSkyeng", sans-serif;
    cursor: pointer;
  }

  button {
    cursor: pointer;
    border: none; /* часто полезно убрать дефолтную рамку */
    background: none; /* убираем дефолтный фон */
    padding: 0; /* убираем дефолтные отступы */
  }

  ul li {
    list-style: none;
  }
`;

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #383838;
`;

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const [refreshTokenData, { isLoading, error }] =
    useRefreshTokenDataMutation();

  useEffect(() => {
    dispatch(loadTracks());
  }, [dispatch]);

  // Инициализация состояния с улучшенной обработкой ошибок
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Дополнительная проверка структуры данных
        if (parsedUser && typeof parsedUser === "object") {
          return parsedUser;
        }
      } catch (e) {
        console.error("Ошибка парсинга user из localStorage:", e);
        return null;
      }
    }
    return null;
  });

  // ID интервала для обновления токена
  const [refreshIntervalId, setRefreshIntervalId] = useState(null);

  const handleRefreshToken = async () => {
    // Проверяем, есть ли данные в localStorage
    const dataString = localStorage.getItem("user");
    if (!dataString) {
      console.warn("Данные не найдены в localStorage");
      return;
    }

    try {
      const data = JSON.parse(dataString);
      const { refresh } = data;

      // Вызываем мутацию для обновления токена
      const result = await refreshTokenData({ refresh }).unwrap();

      if (result && result.access) {
        // Если API вернуло новый refresh-токен, используем его
        const newRefresh = result.refresh || refresh;

        // Создаём новый объект с обновлёнными токенами
        const updatedUserData = {
          access: result.access,
          refresh: newRefresh,
        };

        // Сохраняем обновлённые данные в localStorage
        localStorage.setItem("user", JSON.stringify(updatedUserData));

        // Обновляем состояние компонента
        setUser(updatedUserData);
      } else {
        throw new Error("Ответ сервера не содержит access-токен");
      }
    } catch (error) {
      console.error("Ошибка обновления токена:", error);
      // При ошибке останавливаем интервал
      if (refreshIntervalId) {
        clearInterval(refreshIntervalId);
        setRefreshIntervalId(null);
      }
      // Очищаем данные пользователя при ошибке
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  const startTokenRefreshInterval = () => {
    // Останавливаем предыдущий интервал, если он был
    if (refreshIntervalId) {
      clearInterval(refreshIntervalId);
    }

    // Запускаем новый интервал — каждые 200 секунд (200 000 мс)
    const intervalId = setInterval(() => {
      // Не запускаем новый запрос, если предыдущий ещё выполняется
      if (!isLoading) {
        handleRefreshToken();
      }
    }, 200000);

    setRefreshIntervalId(intervalId);
  };

  const cancelRefreshTokenTimer = () => {
    if (refreshIntervalId) {
      clearInterval(refreshIntervalId);
      setRefreshIntervalId(null);
    }
  };

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
    startTokenRefreshInterval();
  };

  const handleLogout = () => {
    cancelRefreshTokenTimer();
    localStorage.removeItem("user");
    setUser(null);
  };

  // Перезапускаем интервал при изменении isLoading (если нужно)
  useEffect(() => {
    if (user && !isLoading && !refreshIntervalId) {
      startTokenRefreshInterval();
    }
  }, [user, isLoading, refreshIntervalId]);

  return (
    <>
      <GlobalStyle />
      <div className="App">
        <StyledWrapper>
          <AppRoutes
            user={user}
            onAuthButtonClick={user ? handleLogout : handleLogin}
          />
        </StyledWrapper>

        {location.pathname !== "/login" &&
          location.pathname !== "/registration" && <AudioPlayer />}
      </div>
    </>
  );
}
export default App;
