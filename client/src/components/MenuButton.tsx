import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LeftSideBar from "@/layout/components/LeftSideBar";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

const MenuButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <MenuIcon className="size-9 text-white border-2 border-zinc-800 rounded-md p-2 hover:bg-zinc-800/50 transition-all duration-300 cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left" className="bg-zinc-950">
        <div onClick={() => setOpen(false)}>
          <LeftSideBar />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuButton;
