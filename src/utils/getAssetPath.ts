import { app } from "electron";
import path from "path";

export function getAssetsPath(...paths: string[]): string {
  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, "assets")
    : path.join(__dirname, "../../assets");

  return path.join(RESOURCES_PATH, ...paths);
}
