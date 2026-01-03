import {
  StyledPlayerTrackPlay,
  StyledTrackPlayContain,
  StyledTrackPlayImage,
  StyledTrackPlaySvg,
  StyledTrackPlayAlbum,
  StyledTrackPlayAuthor,
} from "./TrackPlay";

export function SkelitonAudioPlay() {
  return (
    <StyledPlayerTrackPlay>
      <StyledTrackPlayContain>
        <StyledTrackPlayImage>
          <StyledTrackPlaySvg alt="music">
            <img alt="square" src="/img/skelitons/Skeleton_square.svg" />
          </StyledTrackPlaySvg>
        </StyledTrackPlayImage>
        <StyledTrackPlayAuthor>
          <img alt="square" src="/img/skelitons/Skeleton_rectangle04.svg" />
        </StyledTrackPlayAuthor>
        <StyledTrackPlayAlbum>
          <img alt="square" src="/img/skelitons/Skeleton_rectangle04.svg" />
        </StyledTrackPlayAlbum>
      </StyledTrackPlayContain>
    </StyledPlayerTrackPlay>
  );
}
