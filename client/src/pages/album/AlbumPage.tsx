import { useGetAlbumById } from "@/api/album/hook";
import PlaylistsSkeleton from "@/components/skeletons/PlaylistsSkeleton";
import { useNavigate, useParams } from "react-router-dom";

const AlbumPage = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();

  const {
    data: album,
    isLoading: isAlbumLoading,
    isSuccess: isAlbumSuccess,
  } = useGetAlbumById(albumId);

  if (!isAlbumLoading && !isAlbumSuccess) {
    navigate("/");
  }

  return <div>{!isAlbumLoading && album ? <></> : <PlaylistsSkeleton />}</div>;
};

export default AlbumPage;
