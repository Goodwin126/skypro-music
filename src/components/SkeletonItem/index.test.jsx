import React from "react";
import { render, screen } from "@testing-library/react";
import SkeletonItem from "./index";

// Мок стилизованных компонентов — возвращаем простые HTML-теги
jest.mock("../PlaylistItem/styles", () => ({
  StyledPlaylistItem: "div",
  StyledPlaylistTrack: "div",
  StyledTrackTitle: "div",
  StyledTrackTitleImage: "div",
  StyledTrackTitleSvg: "div",
  StyledTrackTitleText: "div",
  StyledTrackAuthor: "div",
  StyledtrackAlbum: "div",
}));

describe("SkeletonItem", () => {
  it("отрисовывает компонент без ошибок", () => {
    expect(() => {
      render(<SkeletonItem />);
    }).not.toThrow();
  });

  it("содержит заглушку для названия трека", () => {
    render(<SkeletonItem />);
    // Находим первое вхождение (для названия трека)
    const allPlaceholders = screen.getAllByAltText("square");
    const titleImage = allPlaceholders[1];
    expect(titleImage).toBeInTheDocument();
    expect(titleImage.src).toContain("/img/skelitons/Skeleton_rectangle01.svg");
  });

  it("содержит заглушку для автора трека", () => {
    render(<SkeletonItem />);
    // Находим второе вхождение (для автора)
    const allPlaceholders = screen.getAllByAltText("square");
    const authorImage = allPlaceholders[2];
    expect(authorImage).toBeInTheDocument();
    expect(authorImage.src).toContain(
      "/img/skelitons/Skeleton_rectangle02.svg",
    );
  });

  it("содержит заглушку для альбома", () => {
    render(<SkeletonItem />);
    // Находим третье вхождение (для альбома)
    const allPlaceholders = screen.getAllByAltText("square");
    const albumImage = allPlaceholders[3];
    expect(albumImage).toBeInTheDocument();
    expect(albumImage.src).toContain("/img/skelitons/Skeleton_rectangle03.svg");
  });
});
