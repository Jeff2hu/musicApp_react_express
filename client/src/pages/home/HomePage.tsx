import { useGetSongMadeForYou, useGetSongTrending } from "@/api/song/hook";
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
    <ScrollArea className="rounded-md overflow-hidden h-[calc(100vh-188px)] bg-gradient-to-t from-zinc-900 to-black w-full">
      <div className="p-4 sm:p-6 max-w-full">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Good Afternoon</h1>
        <FeatureSection />
      </div>

      <div className="space-y-8 max-w-full">
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
