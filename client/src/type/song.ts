export type Song = {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  albumId: string;
  createdAt: string;
  updatedAt: string;
};

export type SongLite = {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
};
