import { useGetSongMadeForYou, useGetSongTrending } from "@/api/song/hook";
import TopBar from "@/components/TopBar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "react-i18next";
import FeatureSection from "./components/FeatureSection";
import SectionGrid from "./components/SectionGrid";

const HomePage = () => {
  const { t } = useTranslation();
  const { data: songMadeForYou, isLoading: isLoadingMadeForYou } =
    useGetSongMadeForYou();
  const { data: songTrending, isLoading: isLoadingTrending } =
    useGetSongTrending();

  return (
    <ScrollArea className="rounded-md overflow-hidden h-full bg-gradient-to-t from-zinc-900 to-black">
      <TopBar />
      <div className="p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Good Afternoon</h1>
        <FeatureSection />
      </div>

      <div className="space-y-8">
        <SectionGrid
          title={t("HOME.MADE_FOR_YOU")}
          loading={isLoadingMadeForYou}
          songs={songMadeForYou || []}
        />
        <SectionGrid
          title={t("HOME.TRENDING")}
          loading={isLoadingTrending}
          songs={songTrending || []}
        />
      </div>
    </ScrollArea>
  );
};

export default HomePage;
