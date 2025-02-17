import { Dialog, DialogContent } from "@/components/ui/dialog";
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
      <DialogContent className="border-none">
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black/30"
            onClick={() => onOpenChange(false)}
          />
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-start gap-3">
              <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="mt-2 text-base text-gray-500">{description}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <ButtonArea />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
