import { BrowserWindow } from "electron";
import path from "path";
import { Log } from "./lib";
import { IS_DEBUG } from "@/constants";
import { SRC_PATH } from "./constants/paths";

function resolveHtmlPath(htmlFileName: string) {
  if (IS_DEBUG) {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(SRC_PATH, "renderer", htmlFileName)}`;
}

export function renderHTMLForWindow(
  browserWindow: BrowserWindow,
  htmlName: string,
) {
  if (!htmlName.endsWith("_window")) {
    Log.error('The provided HTML name must end with "_window".');
    return;
  }

  browserWindow.loadURL(resolveHtmlPath(`${htmlName}.html`));
}
