import Skeleton from "./Skeleton";

const SectionGridSkeleton = () => {
  return (
    <div className="flex gap-3 rounded-md p-4 justify-between">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-5 rounded-md p-6 bg-zinc-900/50 "
        >
          <Skeleton className="size-44" />
          <div className="flex-1 space-y-2 justify-start w-full">
            <Skeleton className="w-3/4 h-4" />
            <Skeleton className="w-1/2 h-4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionGridSkeleton;
