import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import LeftSideBar from "@/layout/components/LeftSideBar";
import { MenuIcon } from "lucide-react";

const MenuButton = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="size-9 text-white border-2 border-zinc-800 rounded-md p-2 hover:bg-zinc-800/50 transition-all duration-300 cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left" className="bg-zinc-950">
        <LeftSideBar />
      </SheetContent>
    </Sheet>
  );
};

export default MenuButton;
