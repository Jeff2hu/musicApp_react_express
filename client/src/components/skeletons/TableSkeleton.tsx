import Skeleton from "./Skeleton";

const TableSkeleton = () => {
  return (
    <div className="flex flex-col justify-between flex-wrap gap-2 rounded-md w-full">
      <div className="flex gap-2 w-full">
        <Skeleton className="w-12 h-6" />
        <Skeleton className="w-12 h-6" />
      </div>
      <div className="flex flex-1 flex-col items-center gap-5 rounded-md p-10 bg-zinc-900/50">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="flex gap-2 w-full justify-between border-b border-zinc-600 pb-2"
          >
            <div className="flex gap-2 w-1/4 items-center">
              <Skeleton className="size-14" />
              <Skeleton className="w-1/2 h-6" />
            </div>
            <Skeleton className="w-1/12 h-10" />
            <Skeleton className="w-1/12 h-10" />
            <Skeleton className="w-1/12 h-10" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
