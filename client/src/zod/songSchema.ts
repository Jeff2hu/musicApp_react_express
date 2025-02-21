import { z } from "zod";

// Base schema for common fields
const baseSongSchema = {
  title: z.string().min(1, "Title is required"),
  artist: z.string().min(1, "Artist is required"),
  duration: z.string().min(1, "Duration is required"),
  albumId: z.string().min(1, "Album is required").nullable(),
};

// Schema for adding new song
export const addSongSchema = z
  .object({
    mode: z.literal("add"),
    ...baseSongSchema,
    audioFile: z.instanceof(File).nullable(),
    imageFile: z.instanceof(File).nullable(),
  })
  .refine((data) => data.audioFile != null, {
    message: "Audio file is required",
    path: ["audioFile"],
  })
  .refine((data) => data.imageFile != null, {
    message: "Cover image is required",
    path: ["imageFile"],
  });

// Schema for updating existing song
export const updateSongSchema = z.object({
  mode: z.literal("update"),
  ...baseSongSchema,
  audioFile: z.union([z.string(), z.instanceof(File)]),
  imageFile: z.union([z.string(), z.instanceof(File)]),
});
// Combined schema
const songSchema = z.union([addSongSchema, updateSongSchema]);

export type AddSongFormData = z.infer<typeof addSongSchema>;
export type SongFormData = z.infer<typeof songSchema>;

export const defaultAddSongFormData: Omit<AddSongFormData, "mode"> = {
  title: "",
  artist: "",
  duration: "",
  albumId: null,
  audioFile: null,
  imageFile: null,
};

export default songSchema;
