import { app, BrowserWindow, dialog } from "electron";

export function registerEventForWindow(browserWindow: BrowserWindow) {
  browserWindow.on("ready-to-show", () => {
    if (!browserWindow) return;
    
    browserWindow.show();
  });

  browserWindow.on("unresponsive", () => {
    dialog
      .showMessageBox(browserWindow, {
        message: "BreezeOS Native is unresponding due to unexpected issues.",
        type: "info",
        buttons: ["Close the simulator", "Wait until it responds"],
      })
      .then((event) => {
        if (event.response === 1) {
          browserWindow.destroy();
          app.quit();
        }
      })
  });

  // ipcMain.on("safe-to-quit", (_e, res: boolean) => {
  //   if (res) {
  //     browserWindow?.destroy();
  //     app.quit();
  //   }
  // });
}
