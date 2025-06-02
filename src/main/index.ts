/* eslint global-require: off, no-console: off, promise/always-return: off */

import path from "path";
import { app, BrowserWindow, screen } from "electron";
// import {MenuBuilder} from "./menu";
import fs from "fs";
import debug from "electron-debug";
import sourceMapSupport from "source-map-support";
import { ipcMain } from "electron-better-ipc";
import { store } from "./storeManager";
import { IS_DEBUG } from "@/constants/common";
import Log from "./utils/log";
import { loadAllConfig } from "./loadAllConfig";
import GlobalVariable from "./globalVariable";
import loadLanguageFiles from "./utils/loadLanguageFiles";
import LanguageManager from "./languageManager";
import { IPC_NAMES, IPC_TYPES } from "@/constants/ipcNames";
import { DATA_PATH } from "@/constants/paths";

type WindowType = BrowserWindow | null;

let mainWindow: WindowType;
let setupWindow: WindowType;

const entries = JSON.parse(
  fs.readFileSync(path.join(DATA_PATH, "entries.json"), "utf-8"),
) as Record<string, string>;

const preloadPath = app.isPackaged
  ? path.join(__dirname, "preload.js")
  : path.join(__dirname, "../../.erb/dll/preload.js");

const fileSystemPath = path.join(app.getPath("userData"), "filesystem");

if (IS_DEBUG) debug();

if (process.env.NODE_ENV === "production") {
  sourceMapSupport.install();
}

ipcMain.answerRenderer(
  IPC_NAMES.WINDOW_EVENT,
  (type: string, browserWindow) => {
    if (window) {
      switch (type) {
        case IPC_TYPES.WINDOW_EVENT.WINDOW_MINIMIZE:
          browserWindow.minimize();
          break;
        case IPC_TYPES.WINDOW_EVENT.WINDOW_CLOSE:
          browserWindow.close();
          break;
        case IPC_TYPES.WINDOW_EVENT.WINDOW_MAXIMIZED:
          if (browserWindow.isMaximized()) {
            browserWindow.maximize();
          } else {
            browserWindow.unmaximize();
          }
          break;
        case IPC_TYPES.WINDOW_EVENT.WINDOW_IS_MAXIMIZED:
          return browserWindow.isMaximized();
        default:
          break;
      }
    }
  },
);

ipcMain.answerRenderer(IPC_NAMES.HANDLE_STORE, (args: unknown[]) => {
  const [type, param] = args;

  switch (type) {
    case IPC_TYPES.HANDLE_STORE.SET_KEY:
      Object.entries(param as Record<string, unknown>).forEach(
        ([key, value]) => {
          store.set({
            [key]: value,
          });
        },
      );
      break;
    case IPC_TYPES.HANDLE_STORE.GET_KEY:
      return store.get(...(param as string[]));
    case IPC_TYPES.HANDLE_STORE.CLEAR_ALL:
      store.clearAll();
      break;
    case IPC_TYPES.HANDLE_STORE.DELETE_KEY:
      store.delete(...(param as string[]));
      break;
    case IPC_TYPES.HANDLE_STORE.RESET_KEY:
      store.reset(...(param as string[]));
      break;
    case IPC_TYPES.HANDLE_STORE.HAS_KEY:
      return store.has(param as string);
    default:
      return;
  }
});

ipcMain.answerRenderer(IPC_NAMES.HANDLE_LANGUAGE, (args: string[]) => {
  const [type, value] = args;

  switch (type) {
    case IPC_TYPES.HANDLE_LANGUAGE.GET_LANGUAGE_INFO:
      return LanguageManager.getLanguageInfo(value);
    case IPC_TYPES.HANDLE_LANGUAGE.CHANGE_CURRENT_LANGUAGE:
      LanguageManager.changeCurrentLanguage(value);
      break;
    default:
      return;
  }
});

ipcMain.answerRenderer(IPC_NAMES.HANDLE_GLOBAL_VARIABLE, (args: unknown[]) => {
  const [type, param] = args;
  switch (type) {
    case IPC_TYPES.HANDLE_GLOBAL_VARIABLE.SET_KEY:
      Object.entries(param as Record<string, unknown>).forEach(
        ([key, value]) => {
          GlobalVariable.setVariable({
            [key]: value,
          });
        },
      );
      break;
    case IPC_TYPES.HANDLE_GLOBAL_VARIABLE.GET_KEY:
      return GlobalVariable.getVariable(...(param as string[]));
    default:
      return;
  }
});

loadLanguageFiles();

function createMainWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    show: false,
    width,
    height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
      preload: preloadPath,
    },
  });

  loadAllConfig(mainWindow, entries.mainWindow);
}

function createSetupWindow() {
  setupWindow = new BrowserWindow({
    show: false,
    center: true,
    width: 832,
    height: 512,
    titleBarStyle: "hidden",
    trafficLightPosition: { x: 9, y: 8 },
    titleBarOverlay: false,
    maximizable: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: preloadPath,
    },
  });

  loadAllConfig(setupWindow, entries.setupWindow);

  const jsonContent = fs.readFileSync(
    path.join(DATA_PATH, "sequences.json"),
    "utf-8",
  );

  setupWindow.webContents.on("did-finish-load", () => {
    const [isFirstTimeOpened] = store.get("isFirstTimeOpened");

    if (!isFirstTimeOpened) {
      GlobalVariable.setVariable({ setupSequence: JSON.parse(jsonContent) });
    }
  });

  // const menuBuilder = new MenuBuilder(setupWindow, {});
  // menuBuilder.buildSetupMenu();
}

app
  .whenReady()
  .then(() => {
    return fs.stat(fileSystemPath, (err, stat) => {
      // check whether filesystem dir exists or is empty
      if (err?.code === "ENOENT" || stat.size === 0) {
        createSetupWindow();
        app.on("activate", () => {
          if (setupWindow === null) createSetupWindow();
        });
      } else {
        createMainWindow();
        app.on("activate", () => {
          if (mainWindow === null) createMainWindow();
        });
      }
    });
  })
  .catch(() => {
    Log.error("An error has been occurred while starting the simulator!");
  });
