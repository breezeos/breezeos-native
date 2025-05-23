import useDialog from "./useDialog";
import { supportedLanguages } from "../components/global";
import { ipcRenderer } from "electron";
import { useEffect, useState } from "react";

export default function useLanguage() {
  const { createDialog } = useDialog();

  type LangData = Record<string, { [key: string]: string }>;

  const [langData, setLangData] = useState<LangData>();

  useEffect(() => {
    const getData = async () => {
      if (!langData) {
        const data = await ipcRenderer.invoke(
          "handle-language",
          "GET_LANGUAGE_DATA",
        );
        setLangData(data);
      }
    };

    getData();
  }, [langData]);

  function getLanguageData() {
    return ipcRenderer.invoke("handle-language", "GET_LANGUAGE_DATA");
  }

  const getFullSystemLanguage = (
    language: string,
  ) => {
    return ipcRenderer.invoke(
      "handle-language",
      "GET_SYSTEM_LANGUAGE",
      language
    );
  };

  function changeLanguage(id: string) {
    if (!supportedLanguages.includes(id)) {
      createDialog({
        type: "warning",
        message: "This language does not exist!",
      });
    }

    const name = supportedLanguages.find((lang) => lang === id);

    createDialog({
      type: "question",
      message: `Change system language to ${name}?`,
      buttons: [
        {
          label: "No",
        },
        {
          label: "Yes",
          action: () =>
            ipcRenderer.invoke("handle-language", `CHANGE_LANGUAGE:${id}`),
        },
      ],
    });
  }

  function getLanguageKey(key: string) {
    const keySplit = key.split(".");
    const data = langData && langData[keySplit[0]][keySplit[1]]

    if (keySplit.length > 2) return "getLanguageKey only takes 2 arguments";

    if (data === undefined)
      return `Key ${key} does not exist in the language file`;

    if (Array.isArray(data) || typeof data === "object")
      return "Key is not a string";

    return data;
  }

  return {
    langData,
    getFullSystemLanguage,
    getLanguageData,
    changeLanguage,
    getLanguageKey,
  };
}
