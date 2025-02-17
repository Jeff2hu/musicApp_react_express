import { Song, SongLite } from "@/type/song";
import { create } from "zustand";

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;
  audioRef: React.RefObject<HTMLAudioElement> | null;

  initQueue: (songs: Song[]) => void;
  playAlbum: (songs: Song[], startIndex?: number) => void;
  setCurrentSong: (song: Song) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
  setAudioRef: (ref: React.RefObject<HTMLAudioElement>) => void;
  checkIsCurrentSong: (song: Song | SongLite) => boolean;
  handlePlaySong: (song: SongLite) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,
  audioRef: null,
  initQueue: (songs) => {
    set((state) => ({
      queue: songs,
      currentSong: state.currentSong || songs[0],
      currentIndex: state.currentIndex === -1 ? 0 : state.currentIndex,
    }));
  },
  playAlbum: (songs, startIndex = 0) => {
    if (songs.length === 0) return;

    const song = songs[startIndex];

    set({
      queue: songs,
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true,
    });
  },
  setCurrentSong: (song) => {
    if (!song) return;

    set((state) => {
      const songIndex = state.queue.findIndex((s) => s._id === song._id);
      const currentIndex = songIndex !== -1 ? songIndex : state.currentIndex;
      return {
        currentSong: song,
        currentIndex,
        isPlaying: true,
      };
    });
  },
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setAudioRef: (ref) => set({ audioRef: ref }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  playNext: () =>
    set((state) => {
      const nextIndex = state.currentIndex + 1;
      if (nextIndex >= state.queue.length) {
        return {
          ...state,
          isPlaying: false,
        };
      } else {
        return {
          currentIndex: nextIndex,
          currentSong: state.queue[nextIndex],
          isPlaying: true,
        };
      }
    }),
  playPrev: () =>
    set((state) => {
      const prevIndex = state.currentIndex - 1;
      if (prevIndex < 0) {
        return {
          ...state,
          isPlaying: false,
        };
      } else {
        return {
          currentIndex: prevIndex,
          currentSong: state.queue[prevIndex],
          isPlaying: true,
        };
      }
    }),
  checkIsCurrentSong: (song) => {
    return get().currentSong?._id === song._id;
  },
  handlePlaySong: (song) => {
    if (get().checkIsCurrentSong(song)) get().togglePlay();
    else get().setCurrentSong(song as Song);
  },
}));

export default usePlayerStore;
