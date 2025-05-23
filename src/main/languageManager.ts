import { Languages } from "../types";
import ISO3691 from "iso-639-1";
import Store from "./storeManager";
import path from "path";
import fs from "fs";
import yaml from "js-yaml";

const store = new Store();
const lang = store.get<string>("lang");
const localePath = path.resolve(__dirname, "../languages", lang);

export default class LanguageManager {
  private dataObj: Record<string, { [key: string]: {} }> = {};

  public constructor() {
    const dir = fs.readdirSync(localePath);
    dir.forEach((file) => {
      const langPath = path.join(localePath, file);
      const langData = fs.readFileSync(langPath, "utf-8");
      const format = path.extname(file);
      const basename = path.basename(file, format);
      if (format == ".yml") {
        const yamlData = yaml.load(langData);
        this.dataObj[basename] = JSON.parse(JSON.stringify(yamlData));
      }
    });
  }

  public getLanguageData() {
    return this.dataObj;
  }

  public getSystemLanguage(language?: string) {
    const data: Languages = {
      code: lang,
    };

    if (language) {
      data.code = language;
      data.name = ISO3691.getName(language);
    }

    return data;
  }
}
