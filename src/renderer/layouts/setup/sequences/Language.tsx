import { useEffect, useState } from "react";
import SequenceView from "../SequenceView";
import { useLanguage, useStore } from "@r/hooks";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/renderer/components/shadcn-ui/RadioGroup";

type LanguageObject = Record<
  string,
  {
    code: string;
    name: string;
  }
>;

export function Language() {
  const { getLanguageInfo } = useLanguage();
  const { getStoreItem } = useStore();
  const [systemLanguages, setSystemLanguages] = useState<LanguageObject>({});
  const [currentLanguage, setCurrentLanguage] = useState(
    getStoreItem<string>("lang"),
  );

  async function getSystemLanguages() {
    try {
      const languageInfo = await getLanguageInfo();
      setSystemLanguages(languageInfo as LanguageObject);
    } catch {
      console.error("Cannot get system languages info to display.");
    }
  }

  useEffect(() => {
    getSystemLanguages();
  }, []);

  return (
    <SequenceView
      id="language"
      // forwardDisabled={!Boolean(currentLang)}
    >
      <RadioGroup
        className="flex flex-col gap-4"
        defaultValue={currentLanguage}
        onValueChange={(value) => setCurrentLanguage(value)}
      >
        {Object.keys(systemLanguages).map((language) => (
          <div
            className={String.raw`bg-[#fdfdfd] px-7 py-5 shadow-md active:bg-[#f2f2f2] data-[state="checked"]:bg-[var(--bg-color)] data-[state="checked"]:text-slate-50`}
          >
            <RadioGroupItem value={systemLanguages[language].name}>
              <p>{systemLanguages[language].name}</p>
            </RadioGroupItem>
          </div>
        ))}
      </RadioGroup>
    </SequenceView>
  );
}
