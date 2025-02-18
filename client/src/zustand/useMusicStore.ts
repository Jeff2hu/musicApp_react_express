import { Album } from "@/type/album";
import { Song } from "@/type/song";
import { StatsCount } from "@/type/stats";
import { create } from "zustand";

interface MusicStore {
  albums: Album[];
  songs: Song[];
  stats: StatsCount;
  setAlbums: (albums: Album[]) => void;
  setSongs: (songs: Song[]) => void;
  setStats: (stats: StatsCount) => void;
}

const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalUsers: 0,
    totalArtists: 0,
  },
  setAlbums: (albums) => set({ albums }),
  setSongs: (songs) => set({ songs }),
  setStats: (stats) => {
    set((state) => ({
      stats: {
        ...state.stats,
        ...stats,
      },
    }));
  },
}));

export default useMusicStore;
