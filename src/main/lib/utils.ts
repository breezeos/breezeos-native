import { app } from "electron";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import chalk from "chalk";
import GlobalVariable from "../globalVariable";
import LanguageManager from "../languageManager";
import { LANGUAGES_PATH } from "./paths";

export class Log {
  static info(...message: string[]) {
    console.log(chalk.blueBright.bold(message));
  }

  static error(...message: string[]) {
    console.log(chalk.red(chalk.red.bold("ERROR: ") + message));
  }

  static warning(...message: string[]) {
    console.log(
      chalk.yellowBright(chalk.yellowBright.bold("WARNING: ") + message),
    );
  }
}

export function getAssetsPath(...paths: string[]): string {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, "assets")
    : path.join(__dirname, "../../assets");

  return path.join(RESOURCES_PATH, ...paths);
}

export function loadLanguageFiles() {
  const currentLang = LanguageManager.getCurrentLanguage();

  Log.info("Current system language: ", currentLang);

  const dir = path.join(LANGUAGES_PATH, currentLang);
  fs.readdirSync(dir).forEach((file) => {
    const langFile = path.join(dir, file);
    if (path.extname(langFile) === ".yml") {
      const yamlData = fs.readFileSync(langFile, "utf-8");
      const yamlToJson = yaml.load(yamlData);
      try {
        const languageData = GlobalVariable.getVariable("languageData");
        GlobalVariable.setVariables({
          languageData: {
            ...(typeof languageData === "object" && languageData !== null
              ? languageData
              : {}),
            ...JSON.parse(JSON.stringify(yamlToJson)),
          },
        });
        Log.info(`Loaded ${path.basename(langFile)}!`);
      } catch {
        Log.error(
          `An error has occurred while loading ${path.basename(langFile)}!`,
        );
      }
    }
  });
}
