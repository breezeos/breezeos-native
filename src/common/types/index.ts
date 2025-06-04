import defaultConfig from "@/data/store.json";

export type StoreConfigKey = keyof typeof defaultConfig;

export interface GlobalVariableType {
  setupSequence: Record<string, any>;
  languageData: Record<string, string>;
}
