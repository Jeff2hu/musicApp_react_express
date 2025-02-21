import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

interface LoadingProps {
  className?: string;
}

const Loading = ({ className }: LoadingProps) => {
  return (
    <div
      className={cn(
        "flex justify-center items-center h-full bg-zinc-900 rounded-lg",
        className
      )}
    >
      <Loader className="size-8 text-emerald-500 animate-spin" />
    </div>
  );
};

export default Loading;
