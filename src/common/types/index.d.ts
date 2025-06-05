import defaultConfig from "@/data/store.json";

export type StoreConfigKey = keyof typeof defaultConfig;

export interface GlobalVariableType {
  languageData: Record<string, string>;
  [key: string]: Record<string, any>;
}
