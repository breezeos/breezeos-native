import defaultConfig from "@/data/store.json";
import * as FluentIconsType from "../renderer/plugins/fluentIcons";

export type StoreConfigKey = keyof typeof defaultConfig;

export interface GlobalVariableType extends Record<string, any> {
  languageData: Record<string, string>;
}

export type Temperature = "celsius" | "fahrenheit";

export type Theme = "light" | "dark";

export type FluentIconName = keyof typeof FluentIconsType;
