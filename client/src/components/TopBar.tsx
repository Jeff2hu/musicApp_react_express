import { useSettingStore } from "@/zustand/useSettingsStore";
import HeaderIcon from "./HeaderIcon";
import LoginAdminDashboard from "./LoginAdminDashboard";
import MenuButton from "./MenuButton";

const TopBar = () => {
  const isMobile = useSettingStore((state) => state.isMobile);

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-gradient-to-l from-zinc-950 to-black backdrop-blur-md z-10">
      <HeaderIcon isIcon />
      <LoginAdminDashboard />
      {isMobile && <MenuButton />}
    </div>
  );
};

export default TopBar;
