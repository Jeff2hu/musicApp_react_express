import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

const Skeleton = ({ className }: Props) => {
  return (
    <div className={cn("bg-zinc-800 animate-pulse rounded-md", className)} />
  );
};

export default Skeleton;
