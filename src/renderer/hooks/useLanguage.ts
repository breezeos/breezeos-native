import { ipcRenderer } from "electron-better-ipc";
import useDialog from "./useDialog";
import useGlobalVariable from "./useGlobalVariable";
import { IPC_NAMES, IPC_TYPES } from "@/constants/ipcNames";

export default function useLanguage() {
  const { createDialog } = useDialog();
  const { getVariable } = useGlobalVariable();
  const supportedLanguages = ["en", "vi", "zh-CN"];

  async function getLanguageInfo(language?: string) {
    const data = await ipcRenderer.callMain(IPC_NAMES.HANDLE_LANGUAGE, [
      IPC_TYPES.HANDLE_LANGUAGE.GET_LANGUAGE_INFO,
      language,
    ]);
    return data;
  }

  function changeLanguage(id: string) {
    const name = supportedLanguages.find((lang) => lang === id);

    if (!supportedLanguages.includes(id)) {
      createDialog({
        type: "warning",
        message: "This language does not exist!",
      });
    }

    createDialog({
      type: "question",
      message: `Change system language to ${name}?`,
      buttons: [
        {
          label: "No",
        },
        {
          label: "Yes",
          action: () => {
            ipcRenderer.callMain(IPC_NAMES.HANDLE_LANGUAGE, [
              IPC_TYPES.HANDLE_LANGUAGE.CHANGE_CURRENT_LANGUAGE,
              id,
            ]);
          },
        },
      ],
    });
  }

  async function getLanguageKey(key: string) {
    const languageData = await getVariable("languageData");

    if (typeof languageData !== "object" || languageData === null) {
      return "Language data is not available!";
    }

    const data = (languageData as Record<string, unknown>)[key];
    if (!data) return "This key does not exist!";

    if (Array.isArray(data) || typeof data !== "string")
      return "Key is not a string";

    return data;
  }

  return {
    getLanguageInfo,
    changeLanguage,
    getLanguageKey,
  };
}
