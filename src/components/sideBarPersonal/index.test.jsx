import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SideBarPersonal from "./index";

// Мок стилизованных компонентов — возвращаем простые HTML-теги
jest.mock("./styles", () => ({
  StyledSidebarPersonalt: "div",
  StyledSidebarPersonalName: "div",
  StyledSidebarIcon: "div",
}));

describe("SideBarPersonal", () => {
  const mockOnAuthButtonClick = jest.fn();
  const mockSprite = "/sprite.svg";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("render the component without errors", () => {
    expect(() => {
      render(
        <SideBarPersonal
          sprite={mockSprite}
          onAuthButtonClick={mockOnAuthButtonClick}
        />,
      );
    }).not.toThrow();
  });

  it("Display the user's name", () => {
    render(
      <SideBarPersonal
        sprite={mockSprite}
        onAuthButtonClick={mockOnAuthButtonClick}
      />,
    );
    const userName = screen.getByText("Sergey.Ivanov");
    expect(userName).toBeInTheDocument();
  });

  it("display the exit icon (svg с alt='logout')", () => {
    render(
      <SideBarPersonal
        sprite={mockSprite}
        onAuthButtonClick={mockOnAuthButtonClick}
      />,
    );
    const logoutIcon = screen.getByLabelText("logout");
    expect(logoutIcon).toBeInTheDocument();
    expect(logoutIcon.querySelector("use")).toBeInTheDocument();
    expect(logoutIcon.querySelector("use").getAttribute("href")).toBe(
      "/sprite.svg#logout",
    );
  });

  it("call onAuthButtonClick when the component is clicked", () => {
    render(
      <SideBarPersonal
        sprite={mockSprite}
        onAuthButtonClick={mockOnAuthButtonClick}
      />,
    );
    const sidebarPersonal = screen.getByLabelText("logout");
    fireEvent.click(sidebarPersonal);
    expect(mockOnAuthButtonClick).toHaveBeenCalledTimes(1);
  });
});
