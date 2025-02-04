import Skeleton from "./Skeleton";

const AlbumSkeleton = () => {
  return (
    <div className="w-full h-screen flex flex-col items-start justify-start rounded-md p-10 gap-5">
      <div className="flex items-end gap-10 ">
        <Skeleton className="w-[240px] h-[240px]" />
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-10 w-[400px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <Skeleton className="rounded-full w-[45px] h-[45px]" />

      <div className="flex flex-col gap-4 ml-20 w-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-around gap-6 rounded-md p-1.5"
          >
            <div className="flex items-center gap-3 flex-[1]">
              <Skeleton className="w-[75px] h-[75px]" />
              <div className="flex flex-col space-y-2 flex-1">
                <Skeleton className="h-6 w-28" />
                <Skeleton className="h-6 w-28" />
              </div>
            </div>
            <div className="flex items-center gap-10 flex-1">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-32" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlbumSkeleton;
