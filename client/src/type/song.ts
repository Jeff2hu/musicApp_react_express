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

export type CreateSongRequest = {
  title: string;
  artist: string;
  imageFile: File;
  audioFile: File;
  albumId: string | null;
  duration: string;
};

export type UpdateSongRequest = Omit<
  CreateSongRequest,
  "imageFile" | "audioFile"
> & {
  id: string;
  imageFile: File | string;
  audioFile: File | string;
};
