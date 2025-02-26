import SectionGridSkeleton from "@/components/skeletons/SectionGridSkeleton";
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
    <div className="mb-6 p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
      </div>

      {loading || !songs ? (
        <SectionGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full min-w-0">
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
      className="flex flex-col items-center gap-3 rounded-md p-4 bg-zinc-900/50 hover:bg-zinc-700/70 transition-all duration-300 cursor-pointer group relative w-full max-w-[280px] mx-auto h-full min-w-0"
    >
      <div className="w-full aspect-square">
        <img
          src={song.imageUrl}
          alt={song.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="flex-1 space-y-2 w-full">
        <h1 className="font-medium truncate">{song.title}</h1>
        <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
      </div>
      <PlayButton isCurrentSong={checkIsCurrentSong(song)} />
    </div>
  );
};
