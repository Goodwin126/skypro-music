import React from "react";
import { render } from "@testing-library/react";
import TrackList from "./index";

// Мок стилизованных компонентов — простые HTML-теги
jest.mock("./styles", () => ({
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

jest.mock("../PlaylistItem", () =>
  jest
    .fn()
    .mockImplementation((props) => <div {...props}>Mock PlaylistItem</div>),
);

jest.mock("../SkeletonItem", () =>
  jest.fn().mockImplementation(() => <div>Mock SkeletonItem</div>),
);

jest.mock("../SearchByMenu", () =>
  jest.fn().mockImplementation(() => <div>Mock SearchByMenu</div>),
);

// Мок react-redux
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("TrackList (simple test)", () => {
  beforeEach(() => {
    // Настраиваем useSelector для возврата базовых данных
    require("react-redux").useSelector.mockImplementation((selector) =>
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

  it("отрисовывает компонент без ошибок", () => {
    expect(() => {
      render(<TrackList />);
    }).not.toThrow();
  });
});
