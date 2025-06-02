import path from "path";
import fs from "fs";
import yaml from "js-yaml";
import Log from "./log";
import GlobalVariable from "../globalVariable";
import LanguageManager from "../languageManager";
import { LANGUAGE_PATH } from "@/constants/paths";

export default function loadLanguageFiles() {
  const currentLang = LanguageManager.getCurrentLanguage();

  Log.info("Current system language: ", currentLang);

  const dir = path.join(LANGUAGE_PATH, currentLang);
  fs.readdirSync(dir).forEach((file) => {
    const langFile = path.join(dir, file);
    if (path.extname(langFile) === ".yml") {
      const yamlData = fs.readFileSync(langFile, "utf-8");
      const yamlToJson = yaml.load(yamlData);
      try {
        const [languageData] = GlobalVariable.getVariable("languageData");
        GlobalVariable.setVariable({
          languageData: {
            ...(typeof languageData === "object" && languageData !== null
              ? languageData
              : {}),
            ...JSON.parse(JSON.stringify(yamlToJson)),
          },
        });
        Log.info(`Loaded ${path.basename(langFile)}!`);
      } catch (e) {
        Log.error(
          `An error has occurred while loading ${path.basename(langFile)}!`,
        );
      }
    }
  });
}
