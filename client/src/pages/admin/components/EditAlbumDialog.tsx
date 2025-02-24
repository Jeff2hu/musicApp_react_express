import { useCreateAlbum, useUpdateAlbum } from "@/api/admin/hook";
import { ALBUM_API_PORTOCAL } from "@/api/album/protocol";
import { SONG_API_PORTOCAL } from "@/api/song/protocol";
import { STATS_API_PORTOCAL } from "@/api/stats/protocol";
import InputField from "@/components/hookForm/InputField";
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
import { Album } from "@/type/album";
import albumSchema, {
  AlbumFormData,
  defaultAddAlbumFormData,
} from "@/zod/albumSchema";
import { defaultAddSongFormData } from "@/zod/songSchema";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface EditAlbumDialogProps {
  mode: "add" | "update";
  setMode: (mode: "add" | "update") => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  album: Album | null;
  setAlbum: (album: Album | null) => void;
}

const EditAlbumDialog = ({
  open,
  onOpenChange,
  mode,
  setMode,
  album,
  setAlbum,
}: EditAlbumDialogProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const imageFileRef = useRef<HTMLInputElement>(null);
  const dialogContentRef = useRef<HTMLDivElement>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { mutate: createAlbumMutation, isPending: isCreatingAlbumPending } =
    useCreateAlbum(createAlbumSuccess);
  const { mutate: updateAlbumMutation, isPending: isUpdatingAlbumPending } =
    useUpdateAlbum(createAlbumSuccess);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<AlbumFormData>({
    resolver: zodResolver(albumSchema),
  });

  const imageFile = watch("imageFile");

  const onSubmit: SubmitHandler<AlbumFormData> = (data) => {
    if (dialogContentRef.current) {
      dialogContentRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (mode === "add") {
      createAlbumMutation({
        ...data,
        imageFile: data.imageFile as File,
      });
    } else {
      if (!album || !data.imageFile) return;

      updateAlbumMutation({
        ...data,
        id: album._id,
        imageFile: data.imageFile,
      });
    }
  };

  // 修改 onOpenChange 處理
  const handleOpenChange = (newOpen: boolean, forceReset = false) => {
    if ((isCreatingAlbumPending || isUpdatingAlbumPending) && !forceReset) {
      return;
    }

    if (!newOpen) {
      reset(defaultAddAlbumFormData);
      setImageUrl(null);
    }

    onOpenChange(newOpen);
  };

  function createAlbumSuccess() {
    queryClient.invalidateQueries({ queryKey: [SONG_API_PORTOCAL().BASE_URL] });
    queryClient.invalidateQueries({
      queryKey: [ALBUM_API_PORTOCAL().GET_ALBUM],
    });
    queryClient.invalidateQueries({
      queryKey: [STATS_API_PORTOCAL().BASE_URL],
    });
    toast.success("Album created successfully");
    handleOpenChange(false, true);
  }

  useEffect(() => {
    if (open) {
      if (mode === "add") {
        reset(defaultAddSongFormData);
        setValue("mode", "add");
      }
      if (mode === "update" && album) {
        setImageUrl(album!.imageUrl);
        reset({
          ...album,
          releaseYear: album.releaseYear.toString(),
          imageFile: album.imageUrl,
        });
        setValue("mode", "update");
      }
    }
  }, [mode, open, album]);

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
            setAlbum(null);
          }}
        >
          <Plus className="size-4 mr-2" />
          {t("ADMIN.ADD_NEW_ALBUM")}
        </Button>
      </DialogTrigger>
      <DialogContent
        ref={dialogContentRef}
        className={cn(
          "bg-zinc-900 border-zinc-700 max-h-[90vh] overflow-y-auto w-full",
          (isCreatingAlbumPending || isUpdatingAlbumPending) &&
            "overflow-y-hidden"
        )}
        openIcon
      >
        {(isCreatingAlbumPending || isUpdatingAlbumPending) && (
          <div className="absolute inset-0 flex items-center justify-center min-h-screen w-full z-[9999]">
            <Loading className="bg-zinc-800/70 w-full min-h-screen" />
          </div>
        )}

        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {mode === "add"
              ? t("ADMIN.ADD_NEW_ALBUM")
              : t("ADMIN.UPDATE_ALBUM")}
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            {mode === "add"
              ? t("ADMIN.ADD_NEW_ALBUM_TO_YOUR_LIBRARY")
              : t("ADMIN.UPDATE_THE_ALBUM_DETAILS")}
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
                    <div className="text-emerald-500">
                      {t("ADMIN.IMAGE_SELECTED")}:
                    </div>
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
                  <div className="text-sm text-zinc-400">
                    {t("ADMIN.UPLOAD_IMAGE")}
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    {t("ADMIN.CHOOSE_FILE")}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <InputField
            label={t("ALBUM.TITLE")}
            name="title"
            register={register}
            errors={errors}
            inputProps={{
              placeholder: t("ALBUM.ENTER_THE_ALBUM_TITLE"),
            }}
          />

          {/* Artist */}
          <InputField
            label={t("ALBUM.ARTIST")}
            name="artist"
            register={register}
            errors={errors}
            inputProps={{
              placeholder: t("ALBUM.ENTER_THE_ARTIST_NAME"),
            }}
          />

          {/* Release Year */}
          <InputField
            label={t("ALBUM.RELEASE_DATE")}
            name="releaseYear"
            register={register}
            errors={errors}
            inputProps={{
              placeholder: t("ALBUM.ENTER_THE_RELEASE_DATE"),
              type: "number",
            }}
          />

          {/* Submit and Cancel */}
          <div className="flex justify-end items-center gap-2">
            <Button
              onClick={() => handleOpenChange(false)}
              className="font-medium bg-zinc-600 text-zinc-300 transition-all duration-150 hover:bg-zinc-700 hover:text-white hover:shadow-zinc-900/30 hover:shadow-lg"
            >
              {t("SYSTEM.CANCEL")}
            </Button>
            <Button
              type="submit"
              className="font-medium bg-emerald-600 text-emerald-50 transition-all duration-150 hover:bg-emerald-500 hover:text-white hover:shadow-emerald-500/20 hover:shadow-lg"
            >
              {t("SYSTEM.SUBMIT")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAlbumDialog;
