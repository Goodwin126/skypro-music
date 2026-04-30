import React from "react";
import { render, screen } from "@testing-library/react";
import SidbarSkeliton from "./index";

// Мок стилей — только то, что нужно для компонента
jest.mock("../SidebarItem/styles", () => ({
  StyledSidebarItem: (props) => <div {...props} data-testid="styled-item" />,
  StyledSidebarImg: (props) => (
    <img
      {...props}
      data-testid="skeleton-img"
      alt="square"
      src="/img/skelitons/Skeleton_rectangle05.svg"
    />
  ),
  StyledSidebarLink: (props) => <a {...props} data-testid="styled-link" />,
}));

describe("SidbarSkeliton", () => {
  it("отрисовывает компонент без ошибок", () => {
    expect(() => {
      render(<SidbarSkeliton />);
    }).not.toThrow();
  });

  it("отображает 3 блока с изображениями скелетона", () => {
    render(<SidbarSkeliton />);

    const images = screen.getAllByTestId("skeleton-img");
    expect(images).toHaveLength(3);

    images.forEach((image) => {
      expect(image).toHaveAttribute(
        "src",
        "/img/skelitons/Skeleton_rectangle05.svg",
      );
      expect(image).toHaveAttribute("alt", "square");
    });
  });
});
