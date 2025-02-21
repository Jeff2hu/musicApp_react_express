import { useCreateSong, useUpdateSong } from "@/api/admin/hook";
import { ALBUM_API_PORTOCAL } from "@/api/album/protocol";
import { SONG_API_PORTOCAL } from "@/api/song/protocol";
import { STATS_API_PORTOCAL } from "@/api/stats/protocol";
import InputField from "@/components/hookForm/InputField";
import SelectField from "@/components/hookForm/SelectField";
import Loading from "@/components/Loading";
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
import { Song } from "@/type/song";
import songSchema, {
  defaultAddSongFormData,
  SongFormData,
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
  mode: "add" | "update";
  setMode: (mode: "add" | "update") => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  song: Song | null;
  setSong: (song: Song | null) => void;
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
  const dialogContentRef = useRef<HTMLDivElement>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { mutate: createSongMutation, isPending: isCreatingSongPending } =
    useCreateSong(createSongSuccess);
  const { mutate: updateSongMutation, isPending: isUpdatingSongPending } =
    useUpdateSong(createSongSuccess);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<SongFormData>({
    resolver: zodResolver(songSchema),
  });

  const audioFile = watch("audioFile");
  const imageFile = watch("imageFile");

  const onSubmit: SubmitHandler<SongFormData> = (data) => {
    if (dialogContentRef.current) {
      dialogContentRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (mode === "add") {
      createSongMutation({
        ...data,
        imageFile: data.imageFile as File,
        audioFile: data.audioFile as File,
      });
    } else {
      if (!song || !data.imageFile || !data.audioFile) return;

      updateSongMutation({
        ...data,
        id: song._id,
        imageFile: data.imageFile,
        audioFile: data.audioFile,
      });
    }
  };

  // 修改 onOpenChange 處理
  const handleOpenChange = (newOpen: boolean, forceReset = false) => {
    if ((isCreatingSongPending || isUpdatingSongPending) && !forceReset) {
      return;
    }

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
    queryClient.invalidateQueries({
      queryKey: [STATS_API_PORTOCAL().BASE_URL],
    });
    toast.success("Song created successfully");
    handleOpenChange(false, true);
  }

  useEffect(() => {
    if (open) {
      if (mode === "add") {
        reset(defaultAddSongFormData);
        setValue("mode", "add");
      }
      if (mode === "update" && song) {
        setImageUrl(song!.imageUrl);
        reset({
          ...song,
          duration: song.duration.toString(),
          audioFile: song.audioUrl,
          imageFile: song.imageUrl,
        });
        setValue("mode", "update");
      }
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
        ref={dialogContentRef}
        className={cn(
          "bg-zinc-900 border-zinc-700 max-h-[90vh] overflow-y-auto w-full",
          (isCreatingSongPending || isUpdatingSongPending) &&
            "overflow-y-hidden"
        )}
        openIcon
      >
        {(isCreatingSongPending || isUpdatingSongPending) && (
          <div className="absolute inset-0 flex items-center justify-center min-h-screen w-full z-[9999]">
            <Loading className="bg-zinc-800/70 w-full min-h-screen" />
          </div>
        )}

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
              imageFile && imageUrl && "mt-10",
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
                      {typeof imageFile !== "string" &&
                        (imageFile as File).name.slice(0, 20)}
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
              <div
                className={cn(
                  "flex-1 rounded-md border bg-zinc-800/50",
                  errors.audioFile && "border-red-500",
                  "border-zinc-700"
                )}
              >
                {audioFile ? (
                  typeof audioFile === "string" ? (
                    <div className="flex items-center p-2 py-4">
                      <audio
                        className="w-full h-8 [&::-webkit-media-controls-panel]:bg-zinc-800 [&::-webkit-media-controls-panel]:hover:bg-zinc-700 [&::-webkit-media-controls-current-time-display]:text-white [&::-webkit-media-controls-time-remaining-display]:text-white [&::-webkit-media-controls-timeline]:rounded-lg [&::-webkit-media-controls-play-button]:hover:brightness-150 [&::-webkit-media-controls-timeline]:overflow-hidden [&::-webkit-media-controls-volume-slider]:accent-emerald-500 [&::-webkit-media-controls-timeline]:accent-emerald-500"
                        src={audioFile}
                        controls
                        controlsList="nodownload"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  ) : (
                    <div className="p-2 text-sm text-zinc-400">
                      {(audioFile as File).name}
                    </div>
                  )
                ) : (
                  <p className="text-sm text-zinc-400 p-2 text-center">
                    Please Upload Audio File
                  </p>
                )}
              </div>
              <Button
                variant="outline"
                className="shrink-0"
                onClick={() => {
                  audioFileRef.current?.click();
                }}
              >
                <Upload className="size-4 mr-2" />
                Upload
              </Button>
            </div>
            {errors.audioFile && (
              <p className="text-red-500 text-sm">
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
