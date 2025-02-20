import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAlert } from "@/zustand/useAlert";
import { XCircle } from "lucide-react";
import { useCallback } from "react";
import { Button } from "./ui/button";

export function Alert() {
  const { alertOption, setAlertOption } = useAlert();

  const { open, title, description, onOk } = alertOption;

  const onOpenChange = useCallback(
    (open: boolean) => {
      setAlertOption({ ...alertOption, open });
    },
    [alertOption, setAlertOption]
  );

  const onOkClick = useCallback(() => {
    onOk?.();
    onOpenChange(false);
  }, [onOk, onOpenChange]);

  const ButtonArea = useCallback(
    () =>
      onOk ? (
        <>
          <Button variant="gradient_blue" onClick={onOkClick}>
            確定
          </Button>
          <Button variant="gradient_red" onClick={() => onOpenChange(false)}>
            取消
          </Button>
        </>
      ) : (
        <Button variant="gradient_blue" onClick={() => onOpenChange(false)}>
          確定
        </Button>
      ),
    [onOk, onOpenChange, onOkClick]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild className="hidden"></DialogTrigger>
      <DialogContent className="border-none p-0 bg-transparent shadow-none">
        <DialogHeader>
          <DialogTitle className="hidden" />
        </DialogHeader>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />
          <div className="relative bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md rounded-xl shadow-lg dark:shadow-zinc-950/50 border border-gray-200/20 dark:border-white/10 w-full max-w-md mx-4 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-red-100/80 dark:bg-red-500/10">
                  <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {description}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <ButtonArea />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
