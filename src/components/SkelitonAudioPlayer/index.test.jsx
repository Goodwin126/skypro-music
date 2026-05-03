import React from "react";
import { render, screen } from "@testing-library/react";
import SkelitonAudioPlay from "./index";

// Мок стилизованных компонентов — возвращаем простые HTML-теги
vi.mock("../TrackPlay/styles", () => ({
  StyledPlayerTrackPlay: "div",
  StyledTrackPlayContain: "div",
  StyledTrackPlayImage: "div",
  StyledTrackPlaySvg: "div",
  StyledTrackPlayAlbum: "div",
  StyledTrackPlayAuthor: "div",
}));

describe("SkelitonAudioPlay", () => {
  it("отрисовывает компонент без ошибок", () => {
    expect(() => {
      render(<SkelitonAudioPlay />);
    }).not.toThrow();
  });

  it("содержит заглушку для автора трека", () => {
    render(<SkelitonAudioPlay />);
    const authorPlaceholder = screen.getByAltText("square_1");
    expect(authorPlaceholder).toBeInTheDocument();
    expect(authorPlaceholder.src).toContain(
      "/img/skelitons/Skeleton_square.svg",
    );
  });

  it("содержит заглушку для альбома", () => {
    render(<SkelitonAudioPlay />);
    const albumPlaceholder = screen.getByAltText("square_2");
    expect(albumPlaceholder).toBeInTheDocument();
    expect(albumPlaceholder.src).toContain(
      "/img/skelitons/Skeleton_rectangle04.svg",
    );
  });
});
