import { ipcRenderer } from "electron";

const electronHandler = {
  ipcRenderer: ipcRenderer,
};

window.electron = electronHandler;

export type ElectronHandler = typeof electronHandler;
