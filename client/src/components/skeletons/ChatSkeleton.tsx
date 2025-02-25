import Skeleton from "./Skeleton";

const ChatSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className={`flex ${
            index % 2 === 0 ? "justify-end" : "justify-start"
          } w-full`}
        >
          <div
            className={`flex gap-2 p-2 ${
              index % 2 === 0 ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <Skeleton className="size-10 rounded-full" />
            <Skeleton className="h-20 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatSkeleton;
