import React from "react";
import { render, screen } from "@testing-library/react";
import SidbarSkeliton from "./index";

vi.mock("../SidebarItem/styles", () => ({
  StyledSidebarItem: "div",
  StyledSidebarImg: "img",
}));

describe("SidbarSkeliton", () => {
  it('отрисовывает 3 изображения с alt="square"', () => {
    render(<SidbarSkeliton />);
    // Ищем все изображения с alt-текстом "square"
    const images = screen.getAllByAltText("square");

    // Проверяем, что их ровно 3
    expect(images).toHaveLength(3);

    // Дополнительно проверяем src у первого изображения
    expect(images[0]).toHaveAttribute(
      "src",
      "/img/skelitons/Skeleton_rectangle05.svg",
    );
  });
});
