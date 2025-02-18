import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full bg-zinc-900 rounded-lg">
      <Loader className="size-8 text-emerald-500 animate-spin" />
    </div>
  );
};

export default Loading;
