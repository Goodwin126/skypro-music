import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import ProgressBar from "./index";

vi.mock("./styles", () => ({
  StyledTime: "div",
  StyledAllTime: "span",
  StyledCurrentTime: "span",
  StyledProgressInput: "input",
  PRIMARY_COLOR: "#000",
}));

describe("ProgressBar", () => {
  let mockAudio;

  beforeEach(() => {
    mockAudio = { duration: 100, currentTime: 0 };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("возвращает null, если audio не передан", () => {
    const { container } = render(<ProgressBar audio={null} currentTime={0} />);
    expect(container.firstChild).toBeNull();
  });

  it("отображает время в формате MM:SS", () => {
    render(<ProgressBar audio={mockAudio} currentTime={45} />); // 0:45

    const allTime = screen.getByText("1:40"); // 100 сек → 1:40
    const currentTime = screen.getByText("0:45"); // 45 сек → 0:45

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

  it("обновляет currentTime аудио при изменении слайдера", async () => {
    const mockAudioWithSetter = {
      duration: 100,
      _currentTime: 0,
      get currentTime() {
        return this._currentTime;
      },
      set currentTime(value) {
        this._currentTime = value;
      },
    };

    render(<ProgressBar audio={mockAudioWithSetter} currentTime={0} />);

    const progressInput = screen.getByRole("slider", {
      name: "Прогресс воспроизведения",
    });

    await act(async () => {
      fireEvent.change(progressInput, { target: { value: "50" } });
    });

    expect(mockAudioWithSetter.currentTime).toBeCloseTo(50, 1);
  });
});
