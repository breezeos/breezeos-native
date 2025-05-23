import { app, BrowserWindow, ipcMain } from "electron";
import Store from "./storeManager";
import LanguageManager from "./languageManager"

export function setupIpcListener() {
  ipcMain.on("window-event", (event, eventName: String) => {
    const window = BrowserWindow.fromWebContents(event.sender);

    if (window) {
      switch (eventName) {
        case "window-minimize":
          window.minimize();
          break;
        case "window-close":
          window.close();
          break;
        case "window-maximize":
          if (window.isMaximized()) {
            window.maximize();
          } else {
            window.unmaximize();
          }
          break;
        case "window-is-maximized":
          event.returnValue = window?.isMaximized();
          break;
        default:
          break;
      }
    }
  });
}

export function setupIpcHandle() {
  const store = new Store();
  const language = new LanguageManager();

  ipcMain.handle("handle-store", (_e, ...res: string[]) => {
    const [type, key, value] = res;

    switch (type) {
      case "SET_KEY":
        return store.set(key, value);
      case "CLEAR_KEY":
        return store.clear();
      case "DELETE_KEY":
        return store.delete(key);
      case "RESET_KEY":
        return store.reset(...key);
    }
  });

  ipcMain.handle("handle-language", (_e, ...res: string[]) => {
    const [type, value] = res;

    switch (type) {
      case "GET_SYSTEM_LANGUAGE":
        return language.getSystemLanguage(value);
      case "GET_LANGUAGE_DATA":
        return language.getLanguageData();
      case "CHANGE_LANGUAGE":
        store.set("lang", value);
        app.relaunch();
        app.quit();
        break;
      default:
        return null;
    }
  });
}
