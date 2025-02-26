import Skeleton from "./Skeleton";

const StatsDashboardSkeleton = () => {
  return (
    <div className="flex justify-between flex-wrap gap-2 rounded-md w-full">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-1 items-center gap-5 rounded-md p-10 bg-zinc-900/50"
        >
          <Skeleton className="size-16" />
          <div className="flex-1 space-y-2 justify-start w-full">
            <Skeleton className="w-1/4 h-4" />
            <Skeleton className="w-1/6 h-4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsDashboardSkeleton;
