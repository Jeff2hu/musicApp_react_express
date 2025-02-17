import { cn } from "@/lib/utils";
import usePlayerStore from "@/zustand/usePlayerStore";
import { Pause, Play } from "lucide-react";

interface PlayButtonProps {
  isCurrentSong: boolean;
}

const PlayButton = ({ isCurrentSong }: PlayButtonProps) => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  return (
    <div
      className={cn(
        "absolute bottom-4 right-2 flex items-center justify-center size-8 rounded-md bg-green-500 hover:bg-green-400 hover:scale-105 transition-all opacity-0 translate-y-2 group-hover:translate-y-0",
        isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
      )}
    >
      {isCurrentSong && isPlaying ? (
        <Pause className="size-5 text-zinc-800" />
      ) : (
        <Play className="size-5 text-zinc-800" />
      )}
    </div>
  );
};

export default PlayButton;
