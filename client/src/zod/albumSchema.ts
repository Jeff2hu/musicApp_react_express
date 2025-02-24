import { z } from "zod";

// Base schema for common fields
const baseAlbumSchema = {
  title: z.string().min(1, "Title is required"),
  artist: z.string().min(1, "Artist is required"),
  releaseYear: z.string().min(1, "Release year is required"),
};

// Schema for adding new album
export const addAlbumSchema = z
  .object({
    mode: z.literal("add"),
    ...baseAlbumSchema,
    imageFile: z.instanceof(File).nullable(),
  })
  .refine((data) => data.imageFile != null, {
    message: "Cover image is required",
    path: ["imageFile"],
  });

// Schema for updating existing song
export const updateAlbumSchema = z.object({
  mode: z.literal("update"),
  ...baseAlbumSchema,
  imageFile: z.union([z.string(), z.instanceof(File)]),
});
// Combined schema
const albumSchema = z.union([addAlbumSchema, updateAlbumSchema]);

export type AddAlbumFormData = z.infer<typeof addAlbumSchema>;
export type AlbumFormData = z.infer<typeof albumSchema>;

export const defaultAddAlbumFormData: Omit<AddAlbumFormData, "mode"> = {
  title: "",
  artist: "",
  releaseYear: "",
  imageFile: null,
};

export default albumSchema;
