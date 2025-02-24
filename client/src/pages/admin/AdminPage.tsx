import { useGetAlbums } from "@/api/album/hook";
import { useGetSongs } from "@/api/song/hook";
import { useGetStats } from "@/api/stats/hook";
import Loading from "@/components/Loading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/zustand/useAuthStore";
import { Album, Music } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import HeaderIcon from "../../components/HeaderIcon";
import AlbumsTabContent from "./components/AlbumsTabContent";
import SongsTabContent from "./components/SongsTabContent";
import StatsDashboard from "./components/StatsDashboard";

const AdminPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const isAdmin = useAuthStore((state) => state.isAdmin);

  const { isLoading: isStatsLoading } = useGetStats();
  const { isLoading: isSongsLoading } = useGetSongs();
  const { isLoading: isAlbumsLoading } = useGetAlbums();

  return (
    <div className="min-h-screen flex flex-col gap-10 bg-gradient-to-b from-zinc-900 via-zinc-800/70 to-black text-zinc-100 p-8">
      {isStatsLoading ? <Loading /> : <HeaderIcon />}

      {isStatsLoading ? <Loading /> : <StatsDashboard />}

      {isSongsLoading || isAlbumsLoading ? (
        <Loading />
      ) : (
        <Tabs defaultValue="songs" className="w-full">
          <TabsList className="p-1 bg-zinc-800/50 mb-4">
            <TabsTrigger
              value="songs"
              className="data-[state=active]:bg-zinc-700"
            >
              <Music className="mr-2 size-4" />
              {t("ADMIN.SONGS")}
            </TabsTrigger>
            <TabsTrigger
              value="albums"
              className="data-[state=active]:bg-zinc-700"
            >
              <Album className="mr-2 size-4" />
              {t("ADMIN.ALBUMS")}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="songs">
            <SongsTabContent />
          </TabsContent>

          <TabsContent value="albums">
            <AlbumsTabContent />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default AdminPage;
