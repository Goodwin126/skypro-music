import { styled } from "styled-components";

export const PRIMARY_COLOR = "#b672ff";

export const StyledProgressInput = styled.input`
  --progress-height: 8px;
  --progress-color: ${(props) => props.$color ?? PRIMARY_COLOR};
  --progress-bg-color: #2e2e2e;

  margin: 0;
  width: 100%;
  height: var(--progress-height);
  -webkit-appearance: none;
  cursor: pointer;
  background: transparent;
  position: relative;
  overflow: hidden;

  &::-webkit-slider-runnable-track {
    position: relative;
    height: var(--progress-height);
    background: var(--progress-bg-color);
  }
  &::-webkit-slider-thumb {
    position: relative;
    -webkit-appearance: none;
    width: 1px;
    height: 1px;
    box-shadow: calc(-100vmax - 1px) 0 0 100vmax var(--progress-color);
  }

  &::-moz-range-track {
    width: 100%;
    height: var(--progress-height);
    background: var(--progress-bg-color);
    border: none;
    border-radius: 0px;
  }
  &::-moz-range-thumb {
    border: none;
    height: 25px;
    width: 25px;
    border-radius: 50%;
    background: transparent;
  }
`;

export const StyledTime = styled.div`
  padding-right: 10px;
  position: absolute;
  top: -24px;
  right: 0;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #aaa;
  z-index: 1;
`;

export const StyledCurrentTime = styled.span`
  color: white;
`;

export const StyledAllTime = styled.span`
  color: ${PRIMARY_COLOR};
`;
