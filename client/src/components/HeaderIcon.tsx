import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface HeaderIconProps {
  isIcon?: boolean;
}

const HeaderIcon = ({ isIcon = false }: HeaderIconProps) => {
  const { t } = useTranslation();

  return (
    <Link to={"/"} className="flex items-center gap-6">
      <img
        src="/logo.png"
        alt="logo"
        className="size-10 border border-zinc-700 rounded-md shadow-lg shadow-white/10"
      />

      {!isIcon && (
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Music App</h1>
          <p className="text-lg text-zinc-400">{t("HEADER_ICON.SUBTITLE")}</p>
        </div>
      )}
    </Link>
  );
};

export default HeaderIcon;
