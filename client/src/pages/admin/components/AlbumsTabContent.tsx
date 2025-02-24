import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Album } from "@/type/album";
import { Music } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AlbumsTable from "./AlbumsTable";
import EditAlbumDialog from "./EditAlbumDialog";

const AlbumsTabContent = () => {
  const { t } = useTranslation();

  const [openEditAlbumDialog, setOpenEditAlbumDialog] = useState(false);
  const [mode, setMode] = useState<"add" | "update">("add");
  const [album, setAlbum] = useState<Album | null>(null);

  const onClickUpdateAlbum = (album: Album) => {
    setOpenEditAlbumDialog(true);
    setMode("update");
    setAlbum(album);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-3">
                <Music className="size-7 text-emerald-500" />
                {t("ADMIN.ALBUMS_LIBRARY")}
              </CardTitle>
              <CardDescription className="py-2 font-bold">
                {t("ADMIN.MANAGE_YOUR_ALBUMS")}
              </CardDescription>
            </div>
            <EditAlbumDialog
              open={openEditAlbumDialog}
              onOpenChange={setOpenEditAlbumDialog}
              setMode={setMode}
              mode={mode}
              setAlbum={setAlbum}
              album={album}
            />
          </div>
        </CardHeader>

        <CardContent>
          <div className="w-full">
            <AlbumsTable onClickUpdateAlbum={onClickUpdateAlbum} />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AlbumsTabContent;
