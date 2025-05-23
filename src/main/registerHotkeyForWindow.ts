import { BrowserWindow, globalShortcut } from "electron";
import { APP } from "../constants";

export function registerHotkeyForWindow(browserWindow: BrowserWindow | null) {
  globalShortcut.register(
    process.platform === "darwin" ? "Command+Q" : "Alt+F4",
    () => {
      browserWindow?.webContents.send("willQuit", true);
    },
  );

  if (APP.IS_DEBUG) {
    globalShortcut.register("Ctrl+R", () => browserWindow?.reload());

    globalShortcut.register("Ctrl+Shift+I", () =>
      browserWindow?.webContents.openDevTools(),
    );

    globalShortcut.register("F11", () =>
      browserWindow?.setFullScreen(!browserWindow?.isFullScreen),
    );
  }
}
