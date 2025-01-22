import Skeleton from "./Skeleton";

const PlaylistsSkeleton = () => {
  return Array.from({ length: 7 }).map((_, index) => (
    <div key={index} className="flex items-center gap-3 rounded-md p-2">
      <Skeleton className="w-12 h-12" />
      <div className="flex-1 min-w-0 hidden md:block space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  ));
};

export default PlaylistsSkeleton;
