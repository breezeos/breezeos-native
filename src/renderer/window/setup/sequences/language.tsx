import { useEffect, useState } from "react";
import SequenceView from "../../../components/SequenceView";
import { GlobeRegular } from "@fluentui/react-icons";
import useLanguage from "../../../hooks/useLanguage";
import { Languages } from "../../../../types";
import { supportedLanguages } from "../../../components/global";
import { RadioCards, RadioCardsGroup } from "../../../components/ui/RadioCard";

export function Language() {
  const { getFullSystemLanguage } = useLanguage();
  const [systemLanguage, setSystemLanguage] = useState<Languages[]>([]);
  const [currentLang, setCurrentLang] = useState<string>();

  const handleLanguages = async () => {
    const langs: Languages[] = [];

    supportedLanguages.forEach((i) => {
      getFullSystemLanguage(i).then((j) => langs.push(j));
    });
    
    setSystemLanguage(langs);

    console.log(langs);
  }

  useEffect(() => {
    handleLanguages();
  }, []);

  return (
    <SequenceView
      id="language"
      icon={GlobeRegular}
      forwardDisabled={!Boolean(currentLang)}
    >
      <RadioCardsGroup
        defaultValue={currentLang}
        onValueChange={(value) => setCurrentLang(value)}
      >
        {/* {systemLanguage.map((language) => (
          <RadioCards className="radio" value={language.name!}>
            <p>{language.name}</p>
          </RadioCards>
        ))} */}
        <RadioCards className="radio" value="erreer">
            <p>erreer</p>
          </RadioCards>
      </RadioCardsGroup>
    </SequenceView>
  );
}
