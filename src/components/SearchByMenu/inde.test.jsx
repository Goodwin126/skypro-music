import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchByMenu from "./index";

// Мок стилей — заменяем стилизованные компоненты на простые теги
jest.mock("./styles", () => ({
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

    // Ни один список не должен быть виден
    expect(screen.queryByRole("list")).toBeNull();
  });

  it('показывает список исполнителей при клике на кнопку "исполнителю"', () => {
    render(<SearchByMenu />);

    fireEvent.click(screen.getByText("исполнителю"));

    // Проверяем, что список появился
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    // Проверяем наличие хотя бы одного элемента
    expect(screen.getByText("Michael Jackson")).toBeInTheDocument();
    expect(screen.getByText("Frank Sinatra")).toBeInTheDocument();
  });

  it('скрывает список исполнителей при повторном клике на кнопку "исполнителю"', () => {
    render(<SearchByMenu />);

    // Первый клик — показываем
    fireEvent.click(screen.getByText("исполнителю"));
    expect(screen.getByRole("list")).toBeInTheDocument();

    // Второй клик — скрываем
    fireEvent.click(screen.getByText("исполнителю"));
    expect(screen.queryByRole("list")).toBeNull();
  });

  it("показывает правильный список для каждого фильтра", () => {
    render(<SearchByMenu />);

    // 1. Проверяем исполнителей
    fireEvent.click(screen.getByText("исполнителю"));
    expect(screen.getByText("Michael Jackson")).toBeInTheDocument();
    expect(screen.queryByText("1990")).toBeNull(); // Год не должен быть виден

    // 2. Проверяем годы
    fireEvent.click(screen.getByText("году выпуска"));
    expect(screen.getByText("1990")).toBeInTheDocument();
    expect(screen.queryByText("Michael Jackson")).toBeNull(); // Исполнитель не должен быть виден

    // 3. Проверяем жанры
    fireEvent.click(screen.getByText("жанру"));
    expect(screen.getByText("Рок")).toBeInTheDocument();
    expect(screen.queryByText("1990")).toBeNull(); // Год не должен быть виден
  });
});
