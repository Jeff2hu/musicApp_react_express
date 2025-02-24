import { Card, CardContent } from "@/components/ui/card";
import useMusicStore from "@/zustand/useMusicStore";
import { AudioLines, Library, ListMusic, Users2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const StatsDashboard = () => {
  const { t } = useTranslation();
  const stats = useMusicStore((state) => state.stats);

  const statsData = [
    {
      icon: ListMusic,
      label: t("STATS.TOTAL_SONGS"),
      value: stats.totalSongs.toString(),
      bgColor: "bg-emerald-500/10",
      textColor: "text-emerald-500",
    },
    {
      icon: Library,
      label: t("STATS.TOTAL_ALBUMS"),
      value: stats.totalAlbums.toString(),
      bgColor: "bg-violet-500/10",
      textColor: "text-violet-500",
    },
    {
      icon: AudioLines,
      label: t("STATS.TOTAL_ARTISTS"),
      value: stats.totalArtists.toString(),
      bgColor: "bg-yellow-500/10",
      textColor: "text-yellow-500",
    },
    {
      icon: Users2,
      label: t("STATS.TOTAL_USERS"),
      value: stats.totalUsers.toString(),
      bgColor: "bg-orange-500/10",
      textColor: "text-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statsData.map((item) => (
        <StatsCard key={item.label} {...item} />
      ))}
    </div>
  );
};

export default StatsDashboard;

interface StatsCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  bgColor: string;
  textColor: string;
}

const StatsCard = ({
  icon: Icon,
  label,
  value,
  bgColor,
  textColor,
}: StatsCardProps) => {
  return (
    <Card className="bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-700/80 transition-colors cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-md ${bgColor}`}>
            <Icon className={`size-6 ${textColor}`} />
          </div>
          <div>
            <p className="text-sm text-zinc-400">{label}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
