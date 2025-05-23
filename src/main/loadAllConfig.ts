import { BrowserWindow, shell } from "electron";
import Log from "../utils/log";
import { APP } from "../constants";
import { renderHTMLForWindow } from "./renderHTMLForWindow";
import { registerHotkeyForWindow } from "./registerHotkeyForWindow";
import { registerEventForWindow } from "./registerEventForWindow";

const installExtensions = async () => {
  const installer = await import("electron-devtools-installer");
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

  return installer
    .default(installer["REACT_DEVELOPER_TOOLS"], forceDownload)
    .catch((e) => {
      Log.error("An error has been occurred while installing extensions!", e);
    });
};

export async function loadAllConfig(
  browserWindow: BrowserWindow | null,
  entry: string,
) {
  if (APP.IS_DEBUG) await installExtensions();

  renderHTMLForWindow(browserWindow, entry);
  registerHotkeyForWindow(browserWindow);
  registerEventForWindow(browserWindow);

  browserWindow?.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: "deny" };
  });
}
