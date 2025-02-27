import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { PanelRightOpen } from "lucide-react";
import UserList from "./UserList";

const MobileFriend = () => {
  return (
    <Drawer direction="right">
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
        <UserList />
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFriend;
