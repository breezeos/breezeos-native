import { BrowserWindow } from "electron";
import Log from "./utils/log";
import { IS_DEBUG } from "@/constants/common";
import { renderHTMLForWindow } from "./renderHTMLForWindow";
import { registerHotkeyForWindow } from "./registerHotkeyForWindow";
import { registerEventForWindow } from "./registerEventForWindow";

const installExtensions = async () => {
  const installer = await import("electron-devtools-installer");
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

  return installer
    .default(installer["REACT_DEVELOPER_TOOLS"], forceDownload)
    .catch(() => {
      Log.error("Install extensions for development failed.");
    });
};

export async function loadAllConfig(
  browserWindow: BrowserWindow,
  entry: string,
) {
  if (IS_DEBUG) await installExtensions();

  // browserWindow.webContents.setWindowOpenHandler((edata) => {
  //   shell.openExternal(edata.url);
  //   return { action: "deny" };
  // });

  renderHTMLForWindow(browserWindow, entry);
  registerHotkeyForWindow(browserWindow);
  registerEventForWindow(browserWindow);

  Log.info(`Creating ${entry} window...`);

  browserWindow.on("ready-to-show", () => {
    Log.info(`${entry} window created!`);
  });
}
