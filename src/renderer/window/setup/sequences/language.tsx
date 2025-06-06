import { useEffect, useState } from "react";
import SequenceView from "@/renderer/layouts/setup/SequenceView";
import { useLanguage } from "@r/hooks";
import { RadioCards, RadioCardsGroup } from "@r/components/shadcn-ui/RadioCard";

type LanguageObject = Record<
  string,
  {
    code: string;
    name: string;
  }
>;

export function Language() {
  const { getLanguageInfo } = useLanguage();
  const [systemLanguages, setSystemLanguages] = useState<LanguageObject>({});
  const [currentLang, setCurrentLang] = useState<string>();

  useEffect(() => {
    (async () => {
      const languages = (await getLanguageInfo()) as LanguageObject;
      setSystemLanguages(languages);
    })();
  }, [getLanguageInfo]);

  return (
    <SequenceView
      id="language"
      // forwardDisabled={!Boolean(currentLang)}
    >
      <RadioCardsGroup
        defaultValue={currentLang}
        onValueChange={(value) => setCurrentLang(value)}
      >
        {Object.keys(systemLanguages).map((language) => (
          <RadioCards className="radio" value={systemLanguages[language].name}>
            <p>{systemLanguages[language].name}</p>
          </RadioCards>
        ))}
      </RadioCardsGroup>
    </SequenceView>
  );
}
