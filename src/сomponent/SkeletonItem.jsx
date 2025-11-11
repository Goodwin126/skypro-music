import {
  StyledPlaylistItem,
  StyledPlaylistTrack,
  StyledTrackTitle,
  StyledTrackTitleImage,
  StyledTrackTitleSvg,
  StyledTrackTitleText,
  StyledTrackAuthor,
  StyledtrackAlbum,
} from "./playlistItem";

export function SkeletonItem() {
  return (
    <StyledPlaylistItem>
      <StyledPlaylistTrack>
        <StyledTrackTitle>
          <StyledTrackTitleImage>
            <StyledTrackTitleSvg alt="music">
              <img alt="square" src="/img/skelitons/Skeleton_square.svg" />
            </StyledTrackTitleSvg>
          </StyledTrackTitleImage>
          <StyledTrackTitleText>
            <img alt="square" src="/img/skelitons/Skeleton_rectangle01.svg" />
          </StyledTrackTitleText>
        </StyledTrackTitle>
        <StyledTrackAuthor>
          <img alt="square" src="/img/skelitons/Skeleton_rectangle02.svg" />
        </StyledTrackAuthor>
        <StyledtrackAlbum>
          <img alt="square" src="/img/skelitons/Skeleton_rectangle03.svg" />
        </StyledtrackAlbum>
      </StyledPlaylistTrack>
    </StyledPlaylistItem>
  );
}
