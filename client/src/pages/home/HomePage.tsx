import { useGetSongMadeForYou, useGetSongTrending } from "@/api/song/hook";
import TopBar from "@/components/TopBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import FeatureSection from "./components/FeatureSection";
import SectionGrid from "./components/SectionGrid";

const HomePage = () => {
  const { data: songMadeForYou, isLoading: isLoadingMadeForYou } =
    useGetSongMadeForYou();
  const { data: songTrending, isLoading: isLoadingTrending } =
    useGetSongTrending();

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-t from-zinc-900 to-black">
      <TopBar />
      <ScrollArea className="h-[calc(100vh-180px)] ">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            Good Afternoon
          </h1>
          <FeatureSection />
        </div>

        <div className="space-y-8">
          <SectionGrid
            title="Made for you"
            loading={isLoadingMadeForYou}
            songs={songMadeForYou || []}
          />
          <SectionGrid
            title="Trending"
            loading={isLoadingTrending}
            songs={songTrending || []}
          />
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
