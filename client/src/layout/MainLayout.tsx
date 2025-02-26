import TopBar from "@/components/TopBar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useSettingStore } from "@/zustand/useSettingsStore";
import { Outlet, useLocation } from "react-router-dom";
import AudioPlayer from "./components/AudioPlayer";
import FriendsActivity from "./components/FriendsActivity";
import LeftSideBar from "./components/LeftSideBar";
import PlayBackControl from "./components/PlayBackControl";

const MainLayout = () => {
  const { pathname } = useLocation();
  const isMobile = useSettingStore((state) => state.isMobile);

  return (
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex flex-1 h-full overflow-hidden p-2 gap-[1px]"
      >
        <AudioPlayer />
        {!isMobile && (
          <>
            <ResizablePanel defaultSize={20} minSize={10} maxSize={30}>
              <LeftSideBar />
            </ResizablePanel>

            <ResizableHandle className="w-2 bg-black opacity-50 rounded-lg transition-colors cursor-col-resize" />
          </>
        )}

        <ResizablePanel defaultSize={isMobile ? 100 : 60} className="h-full">
          {(isMobile || !pathname.includes("album")) && <TopBar />}
          <Outlet />
        </ResizablePanel>

        {!isMobile && (
          <>
            <ResizableHandle className="w-2 bg-black opacity-50 rounded-lg transition-colors cursor-col-resize" />

            <ResizablePanel
              defaultSize={20}
              minSize={0}
              maxSize={25}
              collapsedSize={0}
            >
              <FriendsActivity />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      <PlayBackControl />
    </div>
  );
};

export default MainLayout;
