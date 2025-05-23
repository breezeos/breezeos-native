import { app } from "electron";
import fs from "fs";
import path from "path";
import { getAssetsPath } from "./utils/getAssetPath";

export const APP = {
  IS_DEBUG:
    process.env.NODE_ENV === "development" || process.env.DEBUG_PROD === "true",
  USER_DATA: app.getPath("userData"),
  FILESYSTEM_PATH: path.join(app.getPath("userData"), "filesystem"),
  APP_ICON: getAssetsPath("icon.png"),
};

type Windows = {
  ENTRIES: Record<string, string>;
};
export const WINDOWS: Windows = {
  ENTRIES: {},
};

const entries = fs.readFileSync(path.join(__dirname, "entries.json"), "utf-8");
WINDOWS.ENTRIES = JSON.parse(entries);