import { useCreateSong, useUpdateSong } from "@/api/admin/hook";
import { ALBUM_API_PORTOCAL } from "@/api/album/protocol";
import { SONG_API_PORTOCAL } from "@/api/song/protocol";
import InputField from "@/components/hookForm/InputField";
import SelectField from "@/components/hookForm/SelectField";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { SongLite } from "@/type/song";
import addSongSchema, {
  AddSongFormData,
  defaultAddSongFormData,
} from "@/zod/songSchema";
import useMusicStore from "@/zustand/useMusicStore";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface AddSongDialogProps {
  mode: "add" | "edit";
  setMode: (mode: "add" | "edit") => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  song: SongLite | null;
  setSong: (song: SongLite | null) => void;
}

const AddSongDialog = ({
  open,
  onOpenChange,
  mode,
  setMode,
  song,
  setSong,
}: AddSongDialogProps) => {
  const queryClient = useQueryClient();

  const albums = useMusicStore((state) => state.albums);

  const audioFileRef = useRef<HTMLInputElement>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { mutate: createSongMutation } = useCreateSong(createSongSuccess);
  const { mutate: updateSongMutation } = useUpdateSong(createSongSuccess);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<AddSongFormData>({
    resolver: zodResolver(addSongSchema),
    defaultValues: defaultAddSongFormData,
  });

  const audioFile = watch("audioFile");
  const imageFile = watch("imageFile");

  const onSubmit: SubmitHandler<AddSongFormData> = (data) => {
    if (mode === "add") {
      createSongMutation({
        ...data,
        imageFile: data.imageFile as File,
        audioFile: data.audioFile as File,
      });
    } else {
      if (!song) return;

      updateSongMutation({
        ...data,
        id: song._id,
        imageFile: data.imageFile as File,
        audioFile: data.audioFile as File,
      });
    }
  };

  // 修改 onOpenChange 處理
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      reset(defaultAddSongFormData);
      setImageUrl(null);
    }
    onOpenChange(newOpen);
  };

  function createSongSuccess() {
    queryClient.invalidateQueries({ queryKey: [SONG_API_PORTOCAL().BASE_URL] });
    queryClient.invalidateQueries({
      queryKey: [ALBUM_API_PORTOCAL().GET_ALBUM],
    });
    toast.success("Song created successfully");
    handleOpenChange(false);
  }

  useEffect(() => {
    if (mode === "edit" && open && song) {
      reset(song);
      setImageUrl(song!.imageUrl);
    }
  }, [mode, open, song]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {import.meta.env.MODE == "development" && (
        <DevTool control={control} placement="top-left" />
      )}
      <DialogTrigger asChild>
        <Button
          className="bg-emerald-500 hover:bg-emerald-600 text-black"
          onClick={() => {
            setMode("add");
            setSong(null);
          }}
        >
          <Plus className="size-4 mr-2" />
          Add Song
        </Button>
      </DialogTrigger>
      <DialogContent
        className="bg-zinc-900 border-zinc-700 max-h-[90vh] overflow-y-auto"
        openIcon
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {mode === "add" ? "Add New Song" : "Update Song"}
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            {mode === "add"
              ? "Add a new song to your library"
              : "Update the song details"}
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Image File */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            {...register("imageFile")}
            ref={(e) => {
              register("imageFile").ref(e);
              if (e) {
                (
                  imageFileRef as React.MutableRefObject<HTMLInputElement | null>
                ).current = e;
              }
            }}
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setValue("imageFile", file);
              if (file) {
                const url = URL.createObjectURL(file);
                setImageUrl(url);
              }
            }}
          />

          {/* Audio File */}
          <input
            type="file"
            accept="audio/*"
            className="hidden"
            {...register("audioFile")}
            ref={(e) => {
              register("audioFile").ref(e); // 把 react-hook-form 的 ref 綁上去
              if (e) {
                (
                  audioFileRef as React.MutableRefObject<HTMLInputElement | null>
                ).current = e;
              }
            }}
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setValue("audioFile", file);
            }}
          />

          {/* Image File */}
          <div
            className={cn(
              "flex items-center justify-center border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer relative",
              imageFile && imageUrl && "mt-10 bg-gray-200",
              errors.imageFile && "border-red-500"
            )}
            onClick={() => imageFileRef.current?.click()}
          >
            <div className="text-center">
              {imageFile && imageUrl ? (
                <div className="">
                  <div className="flex items-center justify-center gap-2 absolute -top-10 left-[50%] -translate-x-1/2 w-full">
                    <div className="text-emerald-500">Image Selected:</div>
                    <div className="text-xl text-zinc-400">
                      {imageFile.name.slice(0, 20)}
                    </div>
                  </div>
                  <img
                    src={imageUrl}
                    alt="Image"
                    className="h-auto object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 my-4">
                  <div className="p-3 bg-zinc-800 rounded-full inline-block">
                    <Upload className="size-6 text-zinc-400" />
                  </div>
                  <div className="text-sm text-zinc-400">Upload artwork</div>
                  <Button variant="outline" size="sm" className="text-xs">
                    Choose File
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Audio File */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Audio File</label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className={cn(
                  "w-full h-10",
                  errors.audioFile && "border-red-500"
                )}
                onClick={(e) => {
                  if (audioFileRef.current) {
                    e.preventDefault();
                    audioFileRef.current.click();
                  }
                }}
              >
                {audioFile ? (
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-emerald-500">
                      {audioFile.name.slice(0, 20)}
                    </div>
                  </div>
                ) : (
                  "Choose Audio File"
                )}
              </Button>
            </div>
            {errors.audioFile && (
              <p className="text-red-500 text-sm text-center">
                {errors.audioFile?.message as string}
              </p>
            )}
          </div>

          {/* Title */}
          <InputField
            label="Title"
            name="title"
            register={register}
            errors={errors}
            inputProps={{
              placeholder: "Enter the title of the song...",
            }}
          />

          {/* Artist */}
          <InputField
            label="Artist"
            name="artist"
            register={register}
            errors={errors}
            inputProps={{
              placeholder: "Enter the artist of the song...",
            }}
          />

          {/* Duration */}
          <InputField
            label="Duration (seconds)"
            name="duration"
            register={register}
            errors={errors}
            inputProps={{
              placeholder: "Enter the duration of the song...",
              type: "number",
            }}
          />

          {/* Album */}
          <SelectField
            label="Album (optional)"
            name="albumId"
            register={register}
            errors={errors}
            options={albums.map((album) => ({
              value: album._id,
              label: album.title,
            }))}
          />

          {/* Submit and Cancel */}
          <div className="flex justify-end items-center gap-2">
            <Button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="font-medium bg-zinc-600 text-zinc-300 transition-all duration-150 hover:bg-zinc-700 hover:text-white hover:shadow-zinc-900/30 hover:shadow-lg"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="font-medium bg-emerald-600 text-emerald-50 transition-all duration-150 hover:bg-emerald-500 hover:text-white hover:shadow-emerald-500/20 hover:shadow-lg"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongDialog;
