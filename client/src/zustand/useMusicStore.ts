import { Album } from "@/type/album";
import { Song } from "@/type/song";
import { create } from "zustand";

interface MusicStore {
  albums: Album[];
  songs: Song[];
  setAlbums: (albums: Album[]) => void;
  setSongs: (songs: Song[]) => void;
}

const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  setAlbums: (albums) => set({ albums }),
  setSongs: (songs) => set({ songs }),
}));

export default useMusicStore;
