import * as S from "../PlaylistItem/styles";

export default function SkeletonItem() {
  return (
    <S.StyledPlaylistItem>
      <S.StyledPlaylistTrack>
        <S.StyledTrackTitle>
          <S.StyledTrackTitleImage>
            <S.StyledTrackTitleSvg alt="music">
              <img alt="square" src="/img/skelitons/Skeleton_square.svg" />
            </S.StyledTrackTitleSvg>
          </S.StyledTrackTitleImage>
          <S.StyledTrackTitleText>
            <img alt="square" src="/img/skelitons/Skeleton_rectangle01.svg" />
          </S.StyledTrackTitleText>
        </S.StyledTrackTitle>
        <S.StyledTrackAuthor>
          <img alt="square" src="/img/skelitons/Skeleton_rectangle02.svg" />
        </S.StyledTrackAuthor>
        <S.StyledtrackAlbum>
          <img alt="square" src="/img/skelitons/Skeleton_rectangle03.svg" />
        </S.StyledtrackAlbum>
      </S.StyledPlaylistTrack>
    </S.StyledPlaylistItem>
  );
}
