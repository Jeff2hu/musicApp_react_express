import { useGetAlbumById } from "@/api/album/hook";
import AlbumSkeleton from "@/components/skeletons/AlbumSkeleton";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import gsap from "gsap";
import { Clock, Play } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const formatDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

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
        <ScrollArea ref={containerRef} className="min-h-[100vh] rounded-md">
          <div className="relative min-h-[100vh]">
            {/* bg gradient */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
            />

            {/* header */}
            <div className="relative z-10">
              <div className="flex p-6 gap-5 pb-8">
                <img
                  src={album.imageUrl}
                  alt={album.title}
                  className="w-[240px] h-[240px] shadow-xl rounded"
                />

                <div className="flex flex-col justify-end">
                  <p className="text-sm font-medium">Album</p>
                  <h1 className="text-7xl font-bold my-4">{album.title}</h1>
                  <div className="flex items-center gap-2 text-sm text-zinc-100">
                    <span className="font-medium text-white">
                      {album.artist}
                    </span>
                    <span>． {album.songs.length} songs</span>
                    <span>． {album.releaseYear}</span>
                  </div>
                </div>
              </div>

              {/* play button */}
              <div className="px-6 pb-4 flex items-center gap-6">
                <Button
                  size="icon"
                  className="size-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
                >
                  <Play className="size-7 text-black" />
                </Button>
              </div>

              {/* songs table */}
              <div className="bg-black/20 backdrop-blur-sm">
                {/* table header */}
                <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                  <p>#</p>
                  <p>Title</p>
                  <p>Released Date</p>
                  <p className="pl-2">
                    <Clock className="size-4" />
                  </p>
                </div>

                {/* table body */}
                <div className="px-6">
                  <div className="space-y-4 py-4">
                    {album.songs.map((song, index) => (
                      <div
                        key={song._id}
                        className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-3 py-2 text-sm text-zinc-400 border-b border-white/5 hover:bg-white/5 transition-all group cursor-pointer"
                      >
                        <div className="flex items-center justify-center transition-all">
                          <span className="group-hover:hidden">
                            {index + 1}
                          </span>
                          <Play className="size-4 hidden group-hover:block" />
                        </div>

                        <div className="flex items-center gap-3">
                          <img
                            src={song.imageUrl}
                            alt={song.title}
                            className="size-12"
                          />
                          <div className="flex flex-col gap-1">
                            <div className="font-medium text-white">
                              {song.title}
                            </div>
                            <div>{song.artist}</div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          {song.createdAt.split("T")[0]}
                        </div>

                        <div className="flex items-center">
                          {formatDuration(song.duration)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      ) : (
        <AlbumSkeleton />
      )}
    </div>
  );
};

export default AlbumPage;
