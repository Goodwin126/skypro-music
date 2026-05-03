import React from "react";
import { render } from "@testing-library/react";
import TrackList from "./index";

// Мок стилизованных компонентов — простые HTML-теги
vi.mock("./styles", () => ({
  StyledMainCenterblock: "div",
  StyledCenterblockSearch: "div",
  StyledSearchSvg: "svg",
  StyledSearchText: "input",
  StyledCenterblockH2: "h2",
  StyledCenterblockContent: "div",
  StyledContentTitle: "div",
  StyledCol01: "div",
  StyledCol02: "div",
  StyledCol03: "div",
  StyledCol04: "div",
  StyledplaylistTitleSvg: "svg",
  StyledContentPlaylist: "div",
}));

vi.mock("../PlaylistItem", () => ({
  default: (props) => <div {...props}>Mock PlaylistItem</div>,
}));

vi.mock("../SkeletonItem", () => ({
  default: () => <div>Mock SkeletonItem</div>,
}));

vi.mock("../SearchByMenu", () => ({
  default: () => <div>Mock SearchByMenu</div>,
}));

// Мок react-redux
vi.mock("react-redux", () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

// Импортируем мокированные useSelector и useDispatch
import { useSelector, useDispatch } from "react-redux";

describe("TrackList (simple test)", () => {
  beforeEach(() => {
    // Настраиваем useSelector для возврата базовых данных
    useSelector.mockImplementation((selector) =>
      selector({
        storage: {
          tracks: [],
          isLoading: false,
          isMyTracks: false,
          track: {
            trackPlaying: null,
            isPlaying: false,
          },
        },
      }),
    );
  });

  afterEach(() => {
    // Сбрасываем моки после каждого теста
    useSelector.mockClear();
    useDispatch.mockClear();
  });

  it("отрисовывает компонент без ошибок", () => {
    expect(() => {
      render(<TrackList />);
    }).not.toThrow();
  });
});
