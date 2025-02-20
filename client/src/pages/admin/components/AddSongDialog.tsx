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
import addSongSchema, {
  AddSongFormData,
  defaultAddSongFormData,
} from "@/zod/songSchema";
import useMusicStore from "@/zustand/useMusicStore";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface AddSongDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddSongDialog = ({ open, onOpenChange }: AddSongDialogProps) => {
  const albums = useMusicStore((state) => state.albums);

  const audioFileRef = useRef<HTMLInputElement>(null);
  const imageFileRef = useRef<HTMLInputElement>(null);

  const [imageUrl, setImageUrl] = useState<string | null>(null);

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
    console.log(data);
  };

  // 修改 onOpenChange 處理
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      reset(defaultAddSongFormData);
      setImageUrl(null);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {import.meta.env.MODE == "development" && (
        <DevTool control={control} placement="top-left" />
      )}
      <DialogTrigger asChild>
        <Button className="bg-emerald-500 hover:bg-emerald-600 text-black">
          <Plus className="size-4 mr-2" />
          Add Song
        </Button>
      </DialogTrigger>
      <DialogContent
        className="bg-zinc-900 border-zinc-700 max-h-[90vh] overflow-y-auto"
        openIcon
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Add New Song</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Add a new song to your library
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
              "flex items-center justify-center p-6 border-2 border-dashed border-zinc-700 rounded-lg cursor-pointer relative",
              imageFile && imageUrl && "mt-10 bg-gray-400",
              errors.imageFile && "border-red-500"
            )}
            onClick={() => imageFileRef.current?.click()}
          >
            <div className="text-center">
              {imageFile && imageUrl ? (
                <div className="space-y-2">
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
                <>
                  <div className="p-3 bg-zinc-800 rounded-full inline-block mb-2">
                    <Upload className="size-6 text-zinc-400" />
                  </div>
                  <div className="text-sm text-zinc-400 mb-2">
                    Upload artwork
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">
                    Choose File
                  </Button>
                </>
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
            name="album"
            register={register}
            errors={errors}
            options={albums.map((album) => ({
              value: album._id,
              label: album.title,
            }))}
          />

          <Button
            type="submit"
            className="font-bold bg-emerald-400 transition-all duration-150 hover:bg-emerald-500 hover:text-white hover:shadow-emerald-500/20 hover:shadow-lg"
          >
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSongDialog;
