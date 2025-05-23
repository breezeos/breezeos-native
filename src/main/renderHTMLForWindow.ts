import { BrowserWindow } from "electron";
import path from "path";
import Log from "../utils/log";
import { APP } from "../constants";

function resolveHtmlPath(htmlFileName: string) {
  if (APP.IS_DEBUG) {
    const port = process.env.PORT || 1212;
    const url = new URL(`http://localhost:${port}`);
    url.pathname = htmlFileName;
    return url.href;
  }
  return `file://${path.resolve(__dirname, "../renderer/", htmlFileName)}`;
}

export function renderHTMLForWindow(
  browserWindow: BrowserWindow | null,
  htmlName: string,
) {
  if (!htmlName.endsWith("_window")) {
    Log.error('The provided HTML name must end with "_window".');
    return;
  }

  browserWindow?.loadURL(resolveHtmlPath(`${htmlName}.html`));
}
