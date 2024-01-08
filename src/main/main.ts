/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { decorateWindow } from '../touchbar/decorate-window';
import fs, { constants } from 'fs';
import { execSync } from 'child_process';

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: Electron.BrowserWindow | null = null;

const userData = app.getPath('userData');

ipcMain.handle('quitWindow', () => {
  return mainWindow?.close();
});

ipcMain.handle('installFs', () => {
  const userDataPath = userData.split(' ').join('\\ ');
  execSync(
    `curl -L "https://drive.google.com/uc?export=download&id=1SaIC7tyhBec7_k9Q89UUcNx8HjJqC-Mp" -o ${userDataPath}/FileSystem.tar.xz && tar -xvf ${userDataPath}/FileSystem.tar.xz -C ${userDataPath} && rm -rf ${userDataPath}/FileSystem.tar.xz`,
  );
});

ipcMain.handle('getDirContent', (_event, arg1, arg2) => {
  const content = fs.readdirSync(`${userData}/FileSystem${arg1}`, arg2);
  return content;
});

ipcMain.handle('getFileContent', (_event, arg1, arg2) => {
  const content = fs.readFileSync(`${userData}/FileSystem${arg1}`, arg2);
  return content;
});

ipcMain.handle('writeDirContent', (_event, arg1, arg2) => {
  const content = fs.mkdirSync(`${userData}/FileSystem${arg1}`, arg2);
  return content;
});

ipcMain.handle('writeFileContent', (_event, arg1, arg2) => {
  const controller = new AbortController();
  const { signal } = controller;
  const content = new Uint8Array(Buffer.from(arg2));
  const promise = fs.writeFileSync(`${userData}/FileSystem${arg1}`, content, {
    signal,
  });
  controller.abort();
  return promise;
});

ipcMain.handle('removePath', (_event, arg1) => {
  const promise = fs.rmSync(`${userData}/FileSystem${arg1}`, { force: true });
  return promise;
});

ipcMain.handle('renamePath', (_event, arg1, arg2) => {
  const callback = fs.renameSync(
    `${userData}/FileSystem${arg1}`,
    `${userData}/FileSystem${arg2}`,
  );
  return callback;
});

ipcMain.handle('fileExists', (_event, arg1, arg2: fs.NoParamCallback) => {
  const callback = fs.access(
    `${userData}/FileSystem${arg1}`,
    constants.F_OK,
    arg2,
  );
  return callback;
});

ipcMain.handle('pathIsDir', (_event, arg) => {
  const callback = fs.lstatSync(`${userData}/FileSystem${arg}`).isDirectory();
  return callback;
});

// ipcMain.handle('installFs', async (_event, arg1) => {
//   const callback = fs.access(
//     `${userData}/FileSystem${arg1}`,
//     constants.F_OK,
//     arg2,
//   );
//   return callback;
// });

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  console.log(userData);
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    fullscreen: true,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  decorateWindow(mainWindow);

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
