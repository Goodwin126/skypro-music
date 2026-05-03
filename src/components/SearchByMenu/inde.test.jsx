import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchByMenu from "./index";

// Мок стилей
vi.mock("./styles", () => ({
  StyledCenterblockFilter: "div",
  StyledFilterTitle: "h2",
  StyledSearchByCategory: "div",
  StyledSearchByItemsList: "ul",
  StyledSearchByItem: "li",
  StyledFilterButton: "button",
}));

describe("SearchByMenu", () => {
  it("отрисовывает компонент без ошибок", () => {
    expect(() => {
      render(<SearchByMenu />);
    }).not.toThrow();
  });

  it('отображает заголовок "Искать по:"', () => {
    render(<SearchByMenu />);
    const title = screen.getByText("Искать по:");
    expect(title).toBeInTheDocument();
  });

  it("отображает три кнопки фильтров", () => {
    render(<SearchByMenu />);

    const singerButton = screen.getByText("исполнителю");
    const yearButton = screen.getByText("году выпуска");
    const genreButton = screen.getByText("жанру");

    expect(singerButton).toBeInTheDocument();
    expect(yearButton).toBeInTheDocument();
    expect(genreButton).toBeInTheDocument();
  });

  it("не отображает списки элементов при initial render (activeFilter = null)", () => {
    render(<SearchByMenu />);

    // Проверяем, что ни один список не отображается
    expect(screen.queryAllByTestId("singers-list")).toHaveLength(0);
    expect(screen.queryAllByTestId("years-list")).toHaveLength(0);
    expect(screen.queryAllByTestId("genre-list")).toHaveLength(0);
  });

  it('показывает список исполнителей при клике на кнопку "исполнителю"', async () => {
    render(<SearchByMenu />);

    fireEvent.click(screen.getByText("исполнителю"));

    await waitFor(() => {
      const list = screen.getByTestId("singers-list");
      expect(list).toBeInTheDocument();
      expect(screen.getByText("Michael Jackson")).toBeInTheDocument();
      expect(screen.getByText("Frank Sinatra")).toBeInTheDocument();
    });
  });

  it('скрывает список исполнителей при повторном клике на кнопку "исполнителю"', async () => {
    render(<SearchByMenu />);

    // Первый клик — показываем
    fireEvent.click(screen.getByText("исполнителю"));
    await waitFor(() => {
      expect(screen.getByTestId("singers-list")).toBeInTheDocument();
    });

    // Второй клик — скрываем
    fireEvent.click(screen.getByText("исполнителю"));
    await waitFor(() => {
      expect(screen.queryByTestId("singers-list")).toBeNull();
    });
  });

  it("показывает правильный список для каждого фильтра", async () => {
    render(<SearchByMenu />);

    // 1. Проверяем исполнителей
    fireEvent.click(screen.getByText("исполнителю"));
    await waitFor(() => {
      expect(screen.getByTestId("singers-list")).toBeInTheDocument();
      expect(screen.getByText("Michael Jackson")).toBeInTheDocument();
      expect(screen.queryByText("1990")).toBeNull(); // Год не должен быть виден
    });

    // Сбрасываем фильтр
    fireEvent.click(screen.getByText("исполнителю"));
    await waitFor(() => {
      expect(screen.queryByTestId("singers-list")).toBeNull();
    });

    // 2. Проверяем годы
    fireEvent.click(screen.getByText("году выпуска"));
    await waitFor(() => {
      expect(screen.getByTestId("years-list")).toBeInTheDocument();
      expect(screen.getByText("1990")).toBeInTheDocument();
      expect(screen.queryByText("Michael Jackson")).toBeNull(); // Исполнитель не должен быть виден
    });

    // Сбрасываем фильтр
    fireEvent.click(screen.getByText("году выпуска"));
    await waitFor(() => {
      expect(screen.queryByTestId("years-list")).toBeNull();
    });

    // 3. Проверяем жанры
    fireEvent.click(screen.getByText("жанру"));
    await waitFor(() => {
      expect(screen.getByTestId("genre-list")).toBeInTheDocument();
      expect(screen.getByText("Рок")).toBeInTheDocument();
      expect(screen.queryByText("1990")).toBeNull(); // Год не должен быть виден
    });
  });
});
