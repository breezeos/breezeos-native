import useDialog from "./useDialog";
import useGlobalVariable from "./useGlobalVariable";
import { IPC_NAMES, IPC_TYPES } from "@/common/constants/ipc";
import { SUPPORTED_LANGUAGES } from "@/common/constants";
import { type GlobalVariableType } from "@/common/types";

export default function useLanguage() {
  const { createDialog } = useDialog();
  const { getVariable } = useGlobalVariable();

  async function getLanguageInfo(language?: string) {
    const data = await window.electronApi.callMain(IPC_NAMES.HANDLE_LANGUAGE, [
      IPC_TYPES.HANDLE_LANGUAGE.GET_LANGUAGE_INFO,
      language,
    ]);
    return data;
  }

  function changeLanguage(id: string) {
    const name = SUPPORTED_LANGUAGES.find((lang) => lang === id);

    if (!SUPPORTED_LANGUAGES.includes(id)) {
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
            window.electronApi.callMain(IPC_NAMES.HANDLE_LANGUAGE, [
              IPC_TYPES.HANDLE_LANGUAGE.CHANGE_CURRENT_LANGUAGE,
              id,
            ]);
          },
        },
      ],
    });
  }

  function getLanguageKey(key: string) {
    const languageData =
      getVariable<GlobalVariableType["languageData"]>("languageData");

    if (typeof languageData !== "object" || languageData === null) {
      return "Language data is not available!";
    }

    const data = languageData[key];

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
