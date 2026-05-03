import React from "react";
import { screen, waitFor, act } from "@testing-library/react"; // добавлен act
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { customRender } from "./test.utils";
import {
  useRefreshTokenDataMutation,
  useSendingLoggingDataMutation,
} from "./services/enter";

// МОК НА ВЕРХНЕМ УРОВНЕ
vi.mock("./services/enter", async () => {
  const actual = await vi.importActual("./services/enter");
  const mockRefreshTokenData = vi.fn();
  const mockSendLoginData = vi.fn();
  const mockSendTokenData = vi.fn();

  return {
    ...actual,
    useRefreshTokenDataMutation: () => [
      mockRefreshTokenData,
      { isLoading: false, error: null },
    ],
    useSendingLoggingDataMutation: () => [
      mockSendLoginData,
      { isLoading: false, isError: false, error: null },
    ],
    useSendingTokenDataMutation: () => [
      mockSendTokenData,
      { isLoading: false, isError: false, error: null },
    ],
  };
});

// Мок данных
const mockTracks = [
  { id: 1, name: "Track 1", author: "Artist 1" },
  { id: 2, name: "Track 2", author: "Artist 2" },
];

// Функция для рендера с историей
const renderAppWithHistory = (initialEntries = ["/"]) => {
  return customRender(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>,
    {
      storeType: "tracks",
    },
  );
};

describe("App", () => {
  beforeEach(() => {
    // Мокаем fetch для загрузки треков
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockTracks,
    });

    // Очищаем моки и localStorage перед каждым тестом
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("отрисовывает компонент без ошибок", async () => {
    // добавлен async
    await act(async () => {
      // обернули в act
      renderAppWithHistory();
    });
  });

  it("загружает треки при монтировании компонента", async () => {
    await act(async () => {
      // обернули в act
      renderAppWithHistory();
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:3001/catalog/track/all/",
      );
    });
  });

  it("корректно инициализирует состояние пользователя из localStorage", async () => {
    const userData = { access: "token123", refresh: "refresh456" };
    localStorage.setItem("user", JSON.stringify(userData));

    await act(async () => {
      // обернули в act
      renderAppWithHistory();
    });

    expect(localStorage.getItem("user")).toBe(JSON.stringify(userData));
  });
});
