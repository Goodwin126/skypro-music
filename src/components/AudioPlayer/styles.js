import styled from "styled-components";

export const StyledBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(28, 28, 28, 0.5);
`;

export const StyledBarContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledBarPlayerBlock = styled.div`
  height: 73px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const StyledBarBarPlayer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const StyledPlayerControls = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 27px 0 31px;
`;

export const StyledPlayerBtnPrev = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  margin-right: 23px;
`;

export const StyledPlayerBtnPrevSvg = styled.svg`
  width: 15px;
  height: 14px;
  cursor: pointer;
`;

export const StyledBtn = styled.div`
  cursor: pointer;
`;

export const StyledPlayerBtnPlay = styled(StyledBtn)`
  padding: 5px;
  display: flex;
  align-items: center;
  margin-right: 23px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const StyledPlayerBtnPlaySvg = styled.svg`
  width: 22px;
  height: 20px;
  fill: #d9d9d9;
`;

export const StyledPlayerBtnNext = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  margin-right: 28px;
  fill: #a53939;
`;

export const StyledPlayerBtnNextSvg = styled.svg`
  width: 15px;
  height: 14px;
  fill: inherit;
  stroke: #d9d9d9;
  cursor: pointer;
`;

export const StyledBtnIcon = styled.div`
  &:hover svg {
    fill: transparent;
    stroke: #acacac;
    cursor: pointer;
  }
  &:active svg {
    fill: transparent;
    stroke: #ffffff;
    cursor: pointer;
  }
`;

export const StyledPlayerBtnRepeat = styled(StyledBtnIcon)`
  padding: 5px;
  display: flex;
  align-items: center;
  margin-right: 24px;
`;

export const StyledPlayerBtnRepeatSvg = styled.svg`
  width: 18px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
`;

export const StyledPlayerBtnShuffle = styled(StyledBtnIcon)`
  display: flex;
  align-items: center;
`;

export const StyledplayerBtnShuffleSvg = styled.svg`
  width: 19px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
`;

export const StyledTrackPlayLikeDis = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 26%;
`;

export const StyledTrackPlayLike = styled(StyledBtnIcon)`
  padding: 5px;
`;

export const StyledTrackPlayDisLike = styled(StyledBtnIcon)`
  padding: 5px;
  margin-left: 28.5px;
`;

export const StyledTrackPlayLikeSvg = styled.svg`
  fill: #696969;
  stroke: #ffffff;
  cursor: pointer;
  width: 14px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
`;

export const StyledTrackPlayDislikeSvg = styled.svg`
  fill: #696969;
  stroke: #ffffff;
  cursor: pointer;
  width: 14.34px;
  height: 13px;
  fill: transparent;
  stroke: #696969;
`;

export const StyledBarVolumeBlock = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  padding: 0 92px 0 0;
`;

export const StyledVolumeContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
`;

export const StyledVolumeImage = styled.div`
  width: 13px;
  height: 18px;
  margin-right: 17px;
`;

export const StyledVolumeSvg = styled.svg`
  width: 13px;
  height: 18px;
  margin-right: 17px;
`;

export const StyledVolumeProgress = styled(StyledBtn)`
  width: 109px;
`;

export const StyledVolumeProgressLine = styled.input`
  width: 109px;
`;
