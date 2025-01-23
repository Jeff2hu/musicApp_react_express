import { create } from "zustand";

interface MusicStore {
  albums: any[];
  songs: any[];
  setAlbums: (albums: any[]) => void;
  setSongs: (songs: any[]) => void;
}

const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  setAlbums: (albums) => set({ albums }),
  setSongs: (songs) => set({ songs }),
}));

export default useMusicStore;
