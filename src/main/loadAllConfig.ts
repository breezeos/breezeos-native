import { BrowserWindow } from "electron";
import { Log } from "./lib";
import { renderHTMLForWindow } from "./renderHTMLForWindow";
import { registerHotkeyForWindow } from "./registerHotkeyForWindow";
import { registerEventForWindow } from "./registerEventForWindow";

export async function loadAllConfig(
  browserWindow: BrowserWindow,
  entry: string,
) {
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
