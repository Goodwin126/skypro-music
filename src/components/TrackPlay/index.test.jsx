import React from "react";
import { screen } from "@testing-library/react";
import { customRender } from "../../test.utils.jsx";
import TrackPlay from "./index";

describe("<TrackPlay />", () => {
  it("should render track name and author with truncation", () => {
    const longTrackName = "Длинное название трека";
    const longTrackAuthor = "Очень длинное имя автора песни";

    customRender(
      <TrackPlay trackName={longTrackName} trackAuthor={longTrackAuthor} />,
    );

    // Проверяем, что длинный текст обрезан до 5 символов + многоточие
    expect(screen.getByText("Длинн...")).toBeInTheDocument();
    expect(screen.getByText("Очень...")).toHaveAttribute("href", "http://");
  });

  it("should render the short track name and artist", () => {
    const shortTrackName = "Song";
    const shortTrackAuthor = "Aut";

    customRender(
      <TrackPlay trackName={shortTrackName} trackAuthor={shortTrackAuthor} />,
    );

    // Проверяем, что короткий текст не обрезан
    expect(screen.getByText(shortTrackName)).toBeInTheDocument();
    expect(screen.getByText(shortTrackAuthor)).toBeInTheDocument();
  });

  it("should handle empty track name and author", () => {
    customRender(<TrackPlay trackName="" trackAuthor="" />);

    // Ищем все ссылки и проверяем, что они пустые
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);

    links.forEach((link) => {
      expect(link).toBeInTheDocument();
      expect(link).toHaveTextContent("");
    });
  });

  it("should display SVG icon and structure correctly", () => {
    customRender(
      <TrackPlay trackName="Test Track" trackAuthor="Test Author" />,
    );

    // Ищем SVG по атрибутам (width/height), если alt не работает
    const svgElement = screen.getByLabelText("music");
    expect(svgElement).toBeInTheDocument();
    expect(svgElement).toHaveAttribute("width", "18");
    expect(svgElement).toHaveAttribute("height", "17");
  });
});
