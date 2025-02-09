import Skeleton from "./Skeleton";

const FeatureSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center bg-zinc-900/50 rounded-md p-4 animate-pulse gap-2"
        >
          <Skeleton className="size-16 sm:size-20" />
          <Skeleton className="h-4 w-3/4 mb-2" />
        </div>
      ))}
    </div>
  );
};

export default FeatureSkeleton;
