import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { formatDuration } from "@/utils/formatDuration";
import usePlayerStore from "@/zustand/usePlayerStore";
import {
  Laptop2,
  ListMusic,
  Mic2,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume1,
} from "lucide-react";
import { useEffect, useState } from "react";

const PlayBackControl = () => {
  const {
    isPlaying,
    currentSong,
    togglePlay,
    playPrev,
    playNext,
    audioRef,
    setIsPlaying,
  } = usePlayerStore();

  const [volumn, setVolumn] = useState<number>(75);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    if (!audioRef || !audioRef.current) return;

    const audioDom = audioRef.current;
    const updateTime = () => setCurrentTime(audioDom.currentTime);
    const updateDuration = () => setDuration(audioDom.duration);

    audioDom.addEventListener("timeupdate", updateTime);
    audioDom.addEventListener("loadedmetadata", updateDuration);

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audioDom.addEventListener("ended", handleEnded);

    return () => {
      audioDom.removeEventListener("timeupdate", updateTime);
      audioDom.removeEventListener("loadedmetadata", updateDuration);
      audioDom.removeEventListener("ended", handleEnded);
    };
  }, [audioRef, setIsPlaying, currentSong]);

  const handleSeek = (value: number[]) => {
    if (!audioRef || !audioRef.current) return;
    audioRef.current.currentTime = value[0];
  };

  return (
    <footer className="h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4">
      <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-start">
          {currentSong && (
            <>
              <img
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className="size-14 object-cover rounded-md"
              />
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate hover:underline cursor-pointer">
                  {currentSong.title}
                </div>
                <div className="text-zinc-400 text-sm truncate hover:underline cursor-pointer ">
                  {currentSong.artist}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
          <div className="flex items-center gap-4 sm:gap-6">
            <Button
              size="icon"
              variant="ghost"
              className="hidden text-zinc-400 hover:text-white sm:inline-flex"
            >
              <Shuffle className="size-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              disabled={!currentSong}
              onClick={playPrev}
              className="text-zinc-400 hover:text-white"
            >
              <SkipBack className="size-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              disabled={!currentSong}
              onClick={togglePlay}
              className="bg-white hover:bg-white/80 text-black rounded-full size-8"
            >
              {isPlaying ? (
                <Pause className="size-5" />
              ) : (
                <Play className="size-5" />
              )}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              disabled={!currentSong}
              onClick={playNext}
              className="text-zinc-400 hover:text-white"
            >
              <SkipForward className="size-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-400 hover:text-white"
            >
              <Repeat className="size-4" />
            </Button>
          </div>

          <div className="hidden sm:flex items-center gap-2 w-full">
            <div className="text-xs text-zinc-400">
              {formatDuration(currentTime)}
            </div>
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              className="w-full hover:cursor-grab active:cursor-grabbing"
              onValueChange={handleSeek}
            />
            <div className="text-xs text-zinc-400">
              {formatDuration(duration)}
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4 min-w-[100px] w-[30%] justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white"
          >
            <Mic2 className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white"
          >
            <ListMusic className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-400 hover:text-white"
          >
            <Laptop2 className="size-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-400 hover:text-white"
            >
              <Volume1 className="size-4" />
            </Button>
            <Slider
              value={[volumn]}
              max={100}
              step={1}
              className="w-24 hover:cursor-grab active:cursor-grabbing"
              onValueChange={(value) => {
                setVolumn(value[0]);
                if (audioRef && audioRef.current) {
                  audioRef.current.volume = value[0] / 100;
                }
              }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PlayBackControl;
