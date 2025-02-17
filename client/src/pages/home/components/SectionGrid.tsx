import SectionGridSkeleton from "@/components/skeletons/SectionGridSkeleton";
import { Button } from "@/components/ui/button";
import { SongLite } from "@/type/song";
import usePlayerStore from "@/zustand/usePlayerStore";
import PlayButton from "./PlayButton";

type Props<T> = {
  title: string;
  loading: boolean;
  songs: T[];
};

const SectionGrid = <T extends SongLite>({
  title,
  songs,
  loading,
}: Props<T>) => {
  return (
    <div className="mb-8 p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
        <Button
          variant="link"
          className="text-sm text-zinc-400 hover:text-white"
        >
          Show All
        </Button>
      </div>

      {loading || !songs ? (
        <SectionGridSkeleton />
      ) : (
        <div className="flex gap-3 rounded-md p-4 justify-between">
          {songs.map((song) => (
            <SongCard key={song._id} song={song} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SectionGrid;

const SongCard = ({ song }: { song: SongLite }) => {
  const { checkIsCurrentSong, handlePlaySong } = usePlayerStore();
  return (
    <div
      onClick={() => handlePlaySong(song)}
      className="flex flex-col items-center gap-5 rounded-md p-6 bg-zinc-900/50 hover:bg-zinc-700/70 transition-all duration-300 w-full cursor-pointer group relative"
    >
      <img src={song.imageUrl} alt={song.title} className="size-44" />
      <div className="flex-1 space-y-2 justify-start w-full">
        <h1 className="font-medium truncate">{song.title}</h1>
        <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
      </div>
      <PlayButton isCurrentSong={checkIsCurrentSong(song)} />
    </div>
  );
};
