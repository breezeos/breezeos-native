/* eslint global-require: off, no-console: off, promise/always-return: off */

import path from "path";
import { app, BrowserWindow, screen } from "electron";
// import {MenuBuilder} from "./menu";
import fs from "fs";
import yaml from "js-yaml";
import debug from "electron-debug";
import Store from "./storeManager";
import { APP, WINDOWS } from "../constants";
import Log from "../utils/log";
import { loadAllConfig } from "./loadAllConfig";
import { setupIpcHandle, setupIpcListener } from "./ipc";

type WindowType = BrowserWindow | null;

let mainWindow: WindowType;
let setupWindow: WindowType;

const preloadPath = app.isPackaged
  ? path.join(__dirname, "preload.js")
  : path.join(__dirname, "../../.erb/dll/preload.js");

if (APP.IS_DEBUG) debug();

const installSourceMapSupport = async () => {
  if (process.env.NODE_ENV === "production") {
    const sourceMapSupport = await import("source-map-support");
    sourceMapSupport.install();
  }
};

installSourceMapSupport();

setupIpcHandle();
setupIpcListener();

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

  loadAllConfig(mainWindow, WINDOWS.ENTRIES[Object.keys({ mainWindow })[0]]);
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

  loadAllConfig(setupWindow, WINDOWS.ENTRIES[Object.keys({ setupWindow })[0]]);

  const store = new Store();
  const yamlPath = path.join(__dirname, "../setup/setup.yml");
  const yamlRoot = yaml.load(fs.readFileSync(yamlPath, "utf-8"));
  const yamlToJson = JSON.parse(JSON.stringify(yamlRoot));

  setupWindow.webContents.on("did-finish-load", () => {
    const isFirstTimeOpened = store.get<boolean>("isFirstTimeOpened");
    if (isFirstTimeOpened === false) {
      setTimeout(() => {
        setupWindow?.webContents.send("load-sequences", yamlToJson);
      }, 100);
    }
  });

  // const menuBuilder = new MenuBuilder(setupWindow, {});
  // menuBuilder.buildSetupMenu();
}

app
  .whenReady()
  .then(() => {
    return fs.stat(APP.FILESYSTEM_PATH, (err, stat) => {
      // check whether filesystem dir exists or is empty
      if (err?.code === "ENOENT" || stat.size === 0) {
        createSetupWindow();
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
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
  .catch((e) => {
    Log.error("An error has been occurred while starting the simulator!", e);
  });
