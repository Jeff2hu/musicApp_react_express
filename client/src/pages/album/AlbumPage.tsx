import { useGetAlbumById } from "@/api/album/hook";
import AlbumSkeleton from "@/components/skeletons/AlbumSkeleton";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDuration } from "@/utils/formatDuration";
import usePlayerStore from "@/zustand/usePlayerStore";
import { useSettingStore } from "@/zustand/useSettingsStore";
import gsap from "gsap";
import { Clock, Pause, Play } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const AlbumPage = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isMobile = useSettingStore((state) => state.isMobile);
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const {
    data: album,
    isLoading: isAlbumLoading,
    isSuccess: isAlbumSuccess,
  } = useGetAlbumById(albumId);

  const isPlayingCurrentAlbum = album?.songs.some(
    (song) => song._id === currentSong?._id
  );

  const handlePlayAlbum = () => {
    if (!album) return;

    if (isPlayingCurrentAlbum) togglePlay();
    else playAlbum(album.songs);
  };

  const handlePlaySong = (index: number) => {
    if (!album) return;

    playAlbum(album.songs, index);
  };

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
    <ScrollArea className="h-[calc(100vh-188px)] rounded-lg">
      {!isAlbumLoading && album ? (
        <div ref={containerRef}>
          <div className="relative">
            {/* bg gradient */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/80 via-zinc-900/80 to-zinc-900 pointer-events-none"
            />

            {/* header */}
            <div className="relative z-10" ref={headerRef}>
              <div className="flex p-6 gap-5 pb-8">
                <img
                  src={album.imageUrl}
                  alt={album.title}
                  className="w-[120px] h-[120px] md:w-[240px] md:h-[240px] shadow-xl rounded"
                />

                <div className="flex flex-col justify-end">
                  <p className="text-sm font-medium">Album</p>
                  <h1 className="text-3xl md:text-7xl font-bold my-4">
                    {album.title}
                  </h1>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-2 text-sm text-zinc-100">
                    <span className="font-medium text-white">
                      {album.artist}
                    </span>
                    <span>
                      {!isMobile && "．"} {album.songs.length} songs
                    </span>
                    <span>
                      {!isMobile && "．"} {album.releaseYear}
                    </span>
                  </div>
                </div>
              </div>

              {/* play button */}
              <div className="px-6 pb-4 flex items-center">
                <Button
                  size="icon"
                  onClick={handlePlayAlbum}
                  className="size-8 md:size-14 rounded-full bg-emerald-500 hover:bg-emerald-600 hover:scale-105 transition-all"
                >
                  {isPlayingCurrentAlbum && isPlaying ? (
                    <Pause className="size-4 md:size-7 text-black/50 hover:text-white" />
                  ) : (
                    <Play className="size-4 md:size-7 text-black/50 hover:text-white" />
                  )}
                </Button>
              </div>

              {/* songs table */}
              <div className="bg-black/20 backdrop-blur-sm">
                {/* table header */}
                <div className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-400 border-b border-white/5">
                  <p>#</p>
                  <p>{t("ALBUM.SONG")}</p>
                  <p>{t("ALBUM.RELEASE_DATE")}</p>
                  <p className="pl-2">
                    <Clock className="size-4" />
                  </p>
                </div>

                {/* table body */}
                <div className={`px-6`}>
                  <div className="space-y-4 py-4">
                    {album.songs.map((song, index) => {
                      const isCurrentSong = currentSong?._id === song._id;

                      return (
                        <div
                          onClick={() => {
                            if (isCurrentSong && isPlaying) togglePlay();
                            else handlePlaySong(index);
                          }}
                          key={song._id}
                          className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-3 py-2 text-sm text-zinc-400 border-b border-white/5 hover:bg-white/5 transition-all group cursor-pointer"
                        >
                          <div className="flex items-center justify-center transition-all">
                            {isCurrentSong && isPlaying ? (
                              <Pause className="size-4" />
                            ) : isCurrentSong ? (
                              <Play className="size-4" />
                            ) : (
                              <span className="group-hover:hidden">
                                {index + 1}
                              </span>
                            )}
                            {!isCurrentSong && (
                              <Play className="size-4 hidden group-hover:block" />
                            )}
                          </div>

                          <div className="flex items-center gap-3">
                            <img
                              src={song.imageUrl}
                              alt={song.title}
                              className="size-8 md:size-12"
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
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AlbumSkeleton />
      )}
    </ScrollArea>
  );
};

export default AlbumPage;
