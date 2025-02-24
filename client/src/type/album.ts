import { Song } from "./song";

export type Album = {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs: Song[];
};

export type CreateAlbumRequest = {
  title: string;
  artist: string;
  releaseYear: string;
  imageFile: File;
};

export type UpdateAlbumRequest = Omit<CreateAlbumRequest, "imageFile"> & {
  id: string;
  imageFile: File | string;
};
