import { app, BrowserWindow, dialog, ipcMain } from "electron";
import Log from "../utils/log";

export function registerEventForWindow(browserWindow: BrowserWindow | null) {
  browserWindow?.on("ready-to-show", () => {
    if (!browserWindow) {
      Log.error(`"${browserWindow}" is not defined`);
    }
    if (process.env.START_MINIMIZED) {
      browserWindow?.minimize();
    } else {
      browserWindow?.show();
    }
  });

  browserWindow?.on("closed", () => {
    browserWindow = null;
  });

  browserWindow?.on("unresponsive", () => {
    dialog
      .showMessageBox(browserWindow as BrowserWindow, {
        message: "The simulator is unresponding due to unexpected issues.",
        type: "error",
        buttons: ["Close the simulator", "Wait until it responds"],
      })
      .then((event) => {
        if (event.response === 1) {
          browserWindow = null;
          app.quit();
        }
      });
  });

  ipcMain.on("safe-to-quit", (_e, res: boolean) => {
    if (res) {
      browserWindow?.destroy();
      app.quit();
    }
  });
}
