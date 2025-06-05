import { ipcRenderer } from "electron-better-ipc";

export const electronApiHandler = {
  callMain: (channel: string, data?: unknown) => {
    return ipcRenderer.callMain(channel, data);
  },
};

window.electronApi = electronApiHandler;
