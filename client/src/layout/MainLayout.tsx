import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import AudioPlayer from "./components/AudioPlayer";
import FriendsActivity from "./components/FriendsActivity";
import LeftSideBar from "./components/LeftSideBar";
import PlayBackControl from "./components/PlayBackControl";

const MainLayout = () => {
  const isMobile = false;

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-1 h-full overflow-hidden p-2 gap-[1px]"
      >
        <AudioPlayer />
        <ResizablePanel
          defaultSize={20}
          minSize={isMobile ? 0 : 10}
          maxSize={30}
        >
          <LeftSideBar />
        </ResizablePanel>

        <ResizableHandle className="w-1 bg-black opacity-50 rounded-lg transition-colors cursor-col-resize" />

        <ResizablePanel defaultSize={isMobile ? 80 : 60} className="h-full">
          <Outlet />
        </ResizablePanel>

        <ResizableHandle className="w-1 bg-black opacity-50 rounded-lg transition-colors cursor-col-resize" />

        <ResizablePanel
          defaultSize={20}
          minSize={0}
          maxSize={25}
          collapsedSize={0}
        >
          <FriendsActivity />
        </ResizablePanel>
      </ResizablePanelGroup>

      <PlayBackControl />
    </div>
  );
};

export default MainLayout;
