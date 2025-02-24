import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Song } from "@/type/song";
import { Music } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import EditSongDialog from "./EditSongDialog";
import SongsTable from "./SongsTable";

const SongsTabContent = () => {
  const { t } = useTranslation();
  const [openEditSongDialog, setOpenEditSongDialog] = useState(false);
  const [mode, setMode] = useState<"add" | "update">("add");
  const [song, setSong] = useState<Song | null>(null);

  const onClickUpdateSong = (song: Song) => {
    setOpenEditSongDialog(true);
    setMode("update");
    setSong(song);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-3">
                <Music className="size-7 text-emerald-500" />
                {t("ADMIN.SONGS_LIBRARY")}
              </CardTitle>
              <CardDescription className="py-2 font-bold">
                {t("ADMIN.MANAGE_YOUR_SONGS")}
              </CardDescription>
            </div>
            <EditSongDialog
              open={openEditSongDialog}
              onOpenChange={setOpenEditSongDialog}
              setMode={setMode}
              mode={mode}
              setSong={setSong}
              song={song}
            />
          </div>
        </CardHeader>

        <CardContent>
          <div className="w-full">
            <SongsTable onClickUpdateSong={onClickUpdateSong} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SongsTabContent;
