import { BrowserWindow, globalShortcut } from "electron";
import { ipcMain } from "electron-better-ipc";
import { IS_DEBUG } from "@/common/constants";
import { IPC_NAMES } from "@/common/constants/ipc";

export function registerHotkeyForWindow(browserWindow: BrowserWindow) {
  globalShortcut.register(
    process.platform === "darwin" ? "Command+Q" : "Alt+F4",
    () => {
      ipcMain.callRenderer(browserWindow, IPC_NAMES.WILL_QUIT, true);
    },
  );

  if (IS_DEBUG) {
    globalShortcut.register("Ctrl+R", () => browserWindow.reload());

    globalShortcut.register("Ctrl+Shift+I", () =>
      browserWindow.webContents.openDevTools(),
    );

    globalShortcut.register("F11", () =>
      browserWindow.setFullScreen(!browserWindow?.isFullScreen),
    );
  }
}
