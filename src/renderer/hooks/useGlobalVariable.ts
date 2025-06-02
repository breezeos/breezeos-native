import { ipcRenderer } from "electron-better-ipc";
import { IPC_NAMES, IPC_TYPES } from "@/constants/ipcNames";

export default function useGlobalVariable() {
  async function getVariable(...keys: string[]) {
    const data = ipcRenderer.callMain(IPC_NAMES.HANDLE_GLOBAL_VARIABLE, [
      IPC_TYPES.HANDLE_GLOBAL_VARIABLE.GET_KEY,
      keys,
    ]);
    return data;
  }

  function setVariable(params: Record<string, unknown>) {
    ipcRenderer.callMain(IPC_NAMES.HANDLE_GLOBAL_VARIABLE, [
      IPC_TYPES.HANDLE_GLOBAL_VARIABLE.SET_KEY,
      params,
    ]);
  }

  return {
    getVariable,
    setVariable,
  };
}
