import { useGetAlbumById } from "@/api/album/hook";
import AlbumSkeleton from "@/components/skeletons/AlbumSkeleton";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AlbumPage = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    data: album,
    isLoading: isAlbumLoading,
    isSuccess: isAlbumSuccess,
  } = useGetAlbumById(albumId);

  useEffect(() => {
    // 只有當資料載入完成且成功時才執行動畫
    if (!isAlbumLoading && album) {
      gsap.set(containerRef.current, {
        x: -100,
        opacity: 0,
      });

      gsap.to(containerRef.current, {
        duration: 0.8,
        x: 0,
        opacity: 1,
        ease: "power3.out",
      });
    }
  }, [albumId, isAlbumLoading, album]);

  if (!isAlbumLoading && !isAlbumSuccess) {
    navigate("/");
  }

  return (
    <div>
      {!isAlbumLoading && album ? (
        <div ref={containerRef}>{album._id}</div>
      ) : (
        <AlbumSkeleton />
      )}
    </div>
  );
};

export default AlbumPage;
