import BasicSelect from "@/components/BasicSelect";
import { useSettingStore } from "@/zustand/useSettingsStore";
import { useTranslation } from "react-i18next";

const SettingPage = () => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useSettingStore();

  const languageHandler = (value: string) => {
    i18n.changeLanguage(value);
    setLanguage(value);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* 設定頁面標題 */}
      <h1 className="text-2xl font-bold mb-6">{t("SETTING.TITLE")}</h1>

      {/* 設定選項列表 */}
      <div className="space-y-6">
        {/* 語言設定區塊 */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">
            {t("SETTING.LANGUAGE")}
          </h2>
          <div className="flex items-center gap-4">
            <label className="w-36 text-sm">
              {t("SETTING.DISPLAY_LANGUAGE")}
            </label>
            <BasicSelect
              value={language}
              options={[
                { value: "zh", label: "繁體中文" },
                { value: "en", label: "English" },
                { value: "ja", label: "日本語" },
              ]}
              onValueChange={languageHandler}
              defaultValue={language}
            />
          </div>
        </div>

        {/* 其他設定區塊（可以根據需求添加） */}
        <div className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">{t("SETTING.THEME")}</h2>
          {/* 這裡可以添加主題相關的設定 */}
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
