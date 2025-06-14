import ISO3691 from "iso-639-1";
import { store } from "./storeManager";
import { app } from "electron";
import { loadLanguageFiles } from "./lib";
import { SUPPORTED_LANGUAGES } from "@/constants";

type LanguageObject = Record<
  string,
  {
    code: string;
    name: string;
  }
>;

export default class LanguageManager {
  static getCurrentLanguage() {
    const currentLanguage = store.getItem<string>("lang");
    return currentLanguage;
  }

  static changeCurrentLanguage(language: string) {
    store.setItems({ lang: language });
    app.relaunch();
    loadLanguageFiles();
    app.exit();
  }

  static getLanguageInfo(language?: string) {
    if (language) {
      return {
        code: language,
        name: ISO3691.getName(language),
      };
    }

    return SUPPORTED_LANGUAGES.reduce((lang, language) => {
      lang[language] = {
        code: language,
        name: ISO3691.getName(language),
      };
      return lang;
    }, {} as LanguageObject);
  }
}
