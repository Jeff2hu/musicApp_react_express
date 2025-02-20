import { z } from "zod";

const addSongSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    artist: z.string().min(1, "Artist is required"),
    duration: z.number().min(1, "Duration is required"),
    album: z.string().min(1, "Album is required").nullable(),
    audioFile: z.instanceof(File).nullable(),
    imageFile: z.instanceof(File).nullable(),
  })
  .refine(
    (data) => {
      if (!data.audioFile) {
        return false;
      }
      return true;
    },
    {
      message: "Audio file is required",
      path: ["audioFile"],
    }
  )
  .refine(
    (data) => {
      if (!data.imageFile) {
        return false;
      }
      return true;
    },
    {
      message: "Cover image is required",
      path: ["imageFile"],
    }
  );

export type AddSongFormData = z.infer<typeof addSongSchema>;

export const defaultAddSongFormData: AddSongFormData = {
  title: "",
  artist: "",
  duration: 0,
  album: "",
  audioFile: null,
  imageFile: null,
};

export default addSongSchema;
