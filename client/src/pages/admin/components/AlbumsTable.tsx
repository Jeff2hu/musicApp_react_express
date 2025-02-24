import { useDeleteAlbum } from "@/api/admin/hook";
import { ALBUM_API_PORTOCAL } from "@/api/album/protocol";
import { STATS_API_PORTOCAL } from "@/api/stats/protocol";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Album } from "@/type/album";
import { useAlert } from "@/zustand/useAlert";
import useMusicStore from "@/zustand/useMusicStore";
import { useQueryClient } from "@tanstack/react-query";
import { Calendar, Edit, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface AlbumsTableProps {
  onClickUpdateAlbum: (album: Album) => void;
}

const AlbumsTable = ({ onClickUpdateAlbum }: AlbumsTableProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { setAlertOption } = useAlert();
  const albums = useMusicStore((state) => state.albums);

  const [isLoading, setIsLoading] = useState(false);

  const { mutate: deleteAlbum } = useDeleteAlbum(deleteAlbumSuccess);

  const deleteAlbumHandler = (id: string) => {
    setIsLoading(true);
    deleteAlbum(id);
  };

  const deleteAlbumConfirmation = (id: string) => {
    setAlertOption({
      open: true,
      title: "Delete Album",
      description: "Are you sure you want to delete this album?",
      onOk: () => {
        deleteAlbumHandler(id);
      },
    });
  };

  function deleteAlbumSuccess() {
    queryClient.invalidateQueries({
      queryKey: [ALBUM_API_PORTOCAL().GET_ALBUM],
    });
    queryClient.invalidateQueries({
      queryKey: [STATS_API_PORTOCAL().BASE_URL],
    });
    toast.success("Song deleted successfully");
    setIsLoading(false);
  }

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>{t("SONG.TITLE")}</TableHead>
          <TableHead>{t("SONG.ARTIST")}</TableHead>
          <TableHead>{t("SONG.RELEASE_DATE")}</TableHead>
          <TableHead className="text-right">{t("SYSTEM.ACTIONS")}</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading ? (
          <TableRow>
            <Loading />
          </TableRow>
        ) : (
          albums.map((album) => (
            <TableRow
              key={album._id}
              className="hover:bg-zinc-800/50 cursor-pointer"
            >
              <TableCell className="font-medium">
                <img
                  src={album.imageUrl}
                  alt={album.title}
                  className="size-10 rounded object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{album.title}</TableCell>
              <TableCell>{album.artist}</TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-1 text-zinc-400">
                  <Calendar className="size-4" />
                  {album.releaseYear}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex gap-2 justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    onClick={() => deleteAlbumConfirmation(album._id)}
                  >
                    <Trash className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onClickUpdateAlbum(album)}
                  >
                    <Edit className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default AlbumsTable;
