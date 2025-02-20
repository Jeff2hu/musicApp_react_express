import { useDeleteSong } from "@/api/song/hook";
import { SONG_API_PORTOCAL } from "@/api/song/protocol";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SongLite } from "@/type/song";
import { useAlert } from "@/zustand/useAlert";
import useMusicStore from "@/zustand/useMusicStore";
import { useQueryClient } from "@tanstack/react-query";
import { Calendar, Edit, Trash } from "lucide-react";
import toast from "react-hot-toast";

interface SongsTableProps {
  onClickUpdateSong: (song: SongLite) => void;
}

const SongsTable = ({ onClickUpdateSong }: SongsTableProps) => {
  const queryClient = useQueryClient();

  const { setAlertOption } = useAlert();
  const songs = useMusicStore((state) => state.songs);
  const { mutate: deleteSong } = useDeleteSong(deleteSongSuccess);

  const deleteSongHandler = (id: string) => {
    deleteSong({ id });
  };

  const deleteSongConfirmation = (id: string) => {
    setAlertOption({
      open: true,
      title: "Delete Song",
      description: "Are you sure you want to delete this song?",
      onOk: () => {
        deleteSongHandler(id);
      },
    });
  };

  function deleteSongSuccess() {
    queryClient.invalidateQueries({ queryKey: [SONG_API_PORTOCAL().BASE_URL] });
    toast.success("Song deleted successfully");
  }

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow className="hover:bg-zinc-800/50">
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Artist</TableHead>
          <TableHead>Release Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {songs.map((song) => (
          <TableRow
            key={song._id}
            className="hover:bg-zinc-800/50 cursor-pointer"
          >
            <TableCell className="font-medium">
              <img
                src={song.imageUrl}
                alt={song.title}
                className="size-10 rounded object-cover"
              />
            </TableCell>
            <TableCell className="font-medium">{song.title}</TableCell>
            <TableCell>{song.artist}</TableCell>
            <TableCell>
              <span className="inline-flex items-center gap-1 text-zinc-400">
                <Calendar className="size-4" />
                {song.createdAt.split("T")[0]}
              </span>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex gap-2 justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                  onClick={() => deleteSongConfirmation(song._id)}
                >
                  <Trash className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onClickUpdateSong(song)}
                >
                  <Edit className="size-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SongsTable;
