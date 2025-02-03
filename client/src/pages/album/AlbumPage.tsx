import { useGetAlbumById } from "@/api/album/hook";
import AlbumSkeleton from "@/components/skeletons/AlbumSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  }, [isAlbumLoading, album]);

  if (!isAlbumLoading && !isAlbumSuccess) {
    navigate("/");
  }

  return (
    <div className="h-full">
      {!isAlbumLoading && album ? (
        <div ref={containerRef} className="h-full">
          <ScrollArea className="h-full">
            <div className="relative min-h-full">
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
              />
              <div className="relative z-10">
                <div className="flex p-6 gap-5 pb-8">
                  <img
                    src={album.imageUrl}
                    alt="Album img"
                    className="w-[240px] h-[240px] shadow-xl rounded"
                  />
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      ) : (
        <AlbumSkeleton />
      )}
    </div>
  );
};

export default AlbumPage;
