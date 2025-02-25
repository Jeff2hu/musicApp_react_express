import Skeleton from "./Skeleton";

const UserListSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} className="flex items-start gap-2 p-2">
          <Skeleton className="size-14 rounded-full" />
          <div className="flex flex-col gap-1 w-[100px]">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserListSkeleton;
