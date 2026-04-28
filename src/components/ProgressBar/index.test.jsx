import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProgressBar from "./index";

jest.mock("./styles", () => ({
  StyledTime: "div",
  StyledAllTime: "span",
  StyledCurrentTime: "span",
  StyledProgressInput: "input",
}));

describe("ProgressBar", () => {
  let mockAudio;

  beforeEach(() => {
    mockAudio = { duration: 100 };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("возвращает null, если audio не передан", () => {
    const { container } = render(<ProgressBar audio={null} currentTime={0} />);
    expect(container.firstChild).toBeNull();
  });

  it("отображает время в формате MM:SS", () => {
    render(<ProgressBar audio={mockAudio} currentTime={45} />); // 0:45

    const allTime = screen.getByText("1:40");
    const currentTime = screen.getByText("0:45");

    expect(allTime).toBeInTheDocument();
    expect(currentTime).toBeInTheDocument();
  });

  it("вычисляет прогресс 0% при currentTime = 0", () => {
    render(<ProgressBar audio={mockAudio} currentTime={0} />);

    const progressInput = screen.getByRole("slider", {
      name: "Прогресс воспроизведения",
    });
    expect(progressInput).toHaveValue("0.0");
  });

  it("вычисляет прогресс 50% при currentTime = 50", () => {
    render(<ProgressBar audio={mockAudio} currentTime={50} />);

    const progressInput = screen.getByRole("slider", {
      name: "Прогресс воспроизведения",
    });
    expect(progressInput).toHaveValue("50.0");
  });

  it("вычисляет прогресс 75% при currentTime = 75", () => {
    render(<ProgressBar audio={mockAudio} currentTime={75} />);

    const progressInput = screen.getByRole("slider", {
      name: "Прогресс воспроизведения",
    });
    expect(progressInput).toHaveValue("75.0");
  });
});
