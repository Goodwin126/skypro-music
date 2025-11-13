import { TrackPlay } from "./TrakePlay";
import { SkelitonAudioPlay } from "./SkelitonAudioPlayer";
import styled from "styled-components";

const StyledBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(28, 28, 28, 0.5);
`;

const StyledBarContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledBarPlayerProgress = styled.div`
  width: 100%;
  height: 5px;
  background: #2e2e2e;
`;

const StyledBarPlayerBlock = styled.div`
  height: 73px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledBarBarPlayer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const StyledPlayerControls = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 27px 0 31px;
`;

const StyledPlayerBtnPrev = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  margin-right: 23px;
`;

const StyledPlayerBtnPrevSvg = styled.svg`
  width: 15px;
  height: 14px;
  cursor: pointer;
`;

const StyledBtn = styled.div`
  cursor: pointer;
`;

const StyledPlayerBtnPlay = styled(StyledBtn)`
  padding: 5px;
  display: flex;
  align-items: center;
  margin-right: 23px;
  cursor: pointer;
`;

const StyledPlayerBtnPlaySvg = styled.svg`
  width: 22px;
  height: 20px;
  fill: #d9d9d9;
`;

const StyledPlayerBtnNext = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  margin-right: 28px;
  fill: #a53939;
`;

const StyledPayerBtnNextSvg = styled.svg`
  width: 15px;
  height: 14px;
  fill: inherit;
  stroke: #d9d9d9;
  cursor: pointer;
`;

const StyledBtnIcon = styled.div`
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

const StyledPlayerBtnRepeat = styled(StyledBtnIcon)`
  padding: 5px;
  display: flex;
  align-items: center;
  margin-right: 24px;
`;

const StyledPlayerBtnRepeatSvg = styled.svg`
  width: 18px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
`;

const StyledPlayerBtnShuffle = styled(StyledBtnIcon)`
  display: flex;
  align-items: center;
`;

const StyledplayerBtnShuffleSvg = styled.svg`
  width: 19px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
`;

const StyledTrackPlayLikeDis = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 26%;
`;

const StyledTrackPlayLike = styled(StyledBtnIcon)`
  padding: 5px;
`;

const StyledTrackPlayDisLike = styled(StyledBtnIcon)`
  padding: 5px;
  margin-left: 28.5px;
`;

const StyledTrackPlayLikeSvg = styled.svg`
  fill: #696969;
  stroke: #ffffff;
  cursor: pointer;
  width: 14px;
  height: 12px;
  fill: transparent;
  stroke: #696969;
`;

const StyledTrackPlayDislikeSvg = styled.svg`
  fill: #696969;
  stroke: #ffffff;
  cursor: pointer;
  width: 14.34px;
  height: 13px;
  fill: transparent;
  stroke: #696969;
`;

const StyledBarVolumeBlock = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  padding: 0 92px 0 0;
`;

const StyledVolumeContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
`;

const StyledVolumeImage = styled.div`
  width: 13px;
  height: 18px;
  margin-right: 17px;
`;

const StyledVolumeSvg = styled.svg`
  width: 13px;
  height: 18px;
  margin-right: 17px;
`;

const StyledVolumeProgress = styled(StyledBtn)`
  width: 109px;
`;

const StyledVolumeProgressLine = styled.input`
  width: 109px;
`;

export function AudioPlayer({ isLoading }) {
  return (
    <StyledBar>
      <StyledBarContent>
        <StyledBarPlayerProgress></StyledBarPlayerProgress>
        <StyledBarPlayerBlock>
          <StyledBarBarPlayer>
            <StyledPlayerControls>
              <StyledPlayerBtnPrev>
                <StyledPlayerBtnPrevSvg alt="prev">
                  <use href="/img/icon/sprite.svg#icon-prev"></use>
                </StyledPlayerBtnPrevSvg>
              </StyledPlayerBtnPrev>
              <StyledPlayerBtnPlay>
                <StyledPlayerBtnPlaySvg alt="play">
                  <use href={`${"/img/icon/sprite.svg"}#icon-play`}></use>
                </StyledPlayerBtnPlaySvg>
              </StyledPlayerBtnPlay>
              <StyledPlayerBtnNext>
                <StyledPayerBtnNextSvg alt="next">
                  <use href={`${"/img/icon/sprite.svg"}#icon-next`}></use>
                </StyledPayerBtnNextSvg>
              </StyledPlayerBtnNext>
              <StyledPlayerBtnRepeat>
                <StyledPlayerBtnRepeatSvg alt="repeat">
                  <use href={`${"/img/icon/sprite.svg"}#icon-repeat`}></use>
                </StyledPlayerBtnRepeatSvg>
              </StyledPlayerBtnRepeat>
              <StyledPlayerBtnShuffle>
                <StyledplayerBtnShuffleSvg alt="shuffle">
                  <use href={`${"/img/icon/sprite.svg"}#icon-shuffle`}></use>
                </StyledplayerBtnShuffleSvg>
              </StyledPlayerBtnShuffle>
            </StyledPlayerControls>
            {isLoading ? <SkelitonAudioPlay /> : <TrackPlay />}
            <StyledTrackPlayLikeDis>
              <StyledTrackPlayLike>
                <StyledTrackPlayLikeSvg alt="like">
                  <use href={`${"/img/icon/sprite.svg"}#icon-like`}></use>
                </StyledTrackPlayLikeSvg>
              </StyledTrackPlayLike>
              <StyledTrackPlayDisLike>
                <StyledTrackPlayDislikeSvg alt="dislike">
                  <use href={`${"/img/icon/sprite.svg"}#icon-dislike`}></use>
                </StyledTrackPlayDislikeSvg>
              </StyledTrackPlayDisLike>
            </StyledTrackPlayLikeDis>
          </StyledBarBarPlayer>
          <StyledBarVolumeBlock>
            <StyledVolumeContent>
              <StyledVolumeImage>
                <StyledVolumeSvg alt="volume">
                  <use href={`${"/img/icon/sprite.svg"}#icon-volume`}></use>
                </StyledVolumeSvg>
              </StyledVolumeImage>
              <StyledVolumeProgress>
                <StyledVolumeProgressLine type="range" name="range" />
              </StyledVolumeProgress>
            </StyledVolumeContent>
          </StyledBarVolumeBlock>
        </StyledBarPlayerBlock>
      </StyledBarContent>
    </StyledBar>
  );
}
