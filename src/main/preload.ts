import { ipcRenderer } from 'electron';

const electronHandler = {
  ipcRenderer,
};

window.electron = electronHandler;

export type ElectronHandler = typeof electronHandler;