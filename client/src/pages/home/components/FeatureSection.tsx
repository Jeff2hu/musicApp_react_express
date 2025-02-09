import { useGetSongFeatured } from "@/api/song/hook";
import FeatureSkeleton from "@/components/skeletons/FeatureSkeleton";

const FeatureSection = () => {
  const { data: songFeatured, isLoading: isLoadingFeatured } =
    useGetSongFeatured();

  if (isLoadingFeatured || !songFeatured) return <FeatureSkeleton />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {songFeatured.map((song) => (
        <div
          key={song._id}
          className="flex items-center gap-2 bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50 transition-colors group cursor-pointer relative"
        >
          <img
            src={song.imageUrl}
            alt={song.title}
            className="size-16 sm:size-20 object-cover flex-shrink-0"
          />
          <div className="flex-1 p-4 ">
            <h1 className="font-medium truncate">{song.title}</h1>
            <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureSection;
