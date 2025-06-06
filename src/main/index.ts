/* eslint global-require: off, no-console: off, promise/always-return: off */

import path from "path";
import { app, BrowserWindow, screen } from "electron";
// import {MenuBuilder} from "./menu";
import fs from "fs";
import debug from "electron-debug";
import sourceMapSupport from "source-map-support";
import { ipcMain } from "electron-better-ipc";
import {
  installExtension,
  REACT_DEVELOPER_TOOLS,
} from "electron-extension-installer";
import { store } from "./storeManager";
import { IS_DEBUG } from "@/common/constants";
import { loadAllConfig } from "./loadAllConfig";
import GlobalVariable from "./globalVariable";
import LanguageManager from "./languageManager";
import { IPC_NAMES, IPC_TYPES } from "@/common/constants/ipc";
import entries from "@/data/entries.json";
import { type StoreConfigKey } from "../common/types";
import { Log, loadLanguageFiles } from "./utils";

type WindowType = BrowserWindow | null;

let mainWindow: WindowType;
let setupWindow: WindowType;

const preloadPath = path.join(__dirname, "preload.js");

const fileSystemPath = path.join(app.getPath("userData"), "filesystem");

async function installExtensions() {
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

  if (IS_DEBUG) {
    debug();
    await installExtension(REACT_DEVELOPER_TOOLS, {
      forceDownload,
    });
  }
}

installExtensions();

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
    case IPC_TYPES.HANDLE_STORE.GET_ALL_ITEMS:
      return store.getAllItems();
    case IPC_TYPES.HANDLE_STORE.SET_ITEMS:
      const params = param as Record<string, unknown>;
      store.setItems(params);
      break;
    case IPC_TYPES.HANDLE_STORE.RESET_ALL_ITEMS:
      store.resetAllItems();
      break;
    case IPC_TYPES.HANDLE_STORE.DELETE_ITEMS:
      store.deleteItems(...(param as StoreConfigKey[]));
      break;
    case IPC_TYPES.HANDLE_STORE.RESET_ITEMS:
      store.resetItems(...(param as StoreConfigKey[]));
      break;
    default:
      break;
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
      break;
  }
});

ipcMain.answerRenderer(IPC_NAMES.HANDLE_GLOBAL_VARIABLE, (args: unknown[]) => {
  const [type, param] = args;
  switch (type) {
    case IPC_TYPES.HANDLE_GLOBAL_VARIABLE.GET_ALL_VARIABLES:
      return GlobalVariable.getAllVariables();
    case IPC_TYPES.HANDLE_GLOBAL_VARIABLE.SET_VARIABLES:
      Object.entries(param as Record<string, unknown>).forEach(
        ([key, value]) => {
          GlobalVariable.setVariables({
            [key]: value,
          });
        },
      );
      break;
    default:
      break;
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
