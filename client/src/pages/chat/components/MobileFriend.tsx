import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { PanelRightOpen } from "lucide-react";
import { useState } from "react";
import UserList from "./UserList";

const MobileFriend = () => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger>
        <Button
          variant="outline"
          size="icon"
          className="transition-all duration-300 bg-transparent hover:bg-zinc-500 hover:text-zinc-800 border-none rounded-full"
        >
          <PanelRightOpen className="size-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col h-full" onClick={() => setOpen(false)}>
          <UserList />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFriend;
