import { ipcRenderer } from "electron-better-ipc";
import { IPC_NAMES, IPC_TYPES } from "@/constants/ipcNames";

export default function useStore() {
  async function getStoreKey(...keys: string[]) {
    const data = await ipcRenderer.callMain(IPC_NAMES.HANDLE_STORE, [
      IPC_TYPES.HANDLE_STORE.GET_KEY,
      keys,
    ]);
    return data;
  }

  function setStoreKey(params: Record<string, unknown>) {
    ipcRenderer.callMain(IPC_NAMES.HANDLE_STORE, [
      IPC_TYPES.HANDLE_STORE.SET_KEY,
      params,
    ]);
  }

  function clearStore() {
    ipcRenderer.callMain(IPC_NAMES.HANDLE_STORE, [
      IPC_TYPES.HANDLE_STORE.CLEAR_ALL,
    ]);
  }

  function deleteStoreKey(...keys: string[]) {
    ipcRenderer.callMain(IPC_NAMES.HANDLE_STORE, [
      IPC_TYPES.HANDLE_STORE.DELETE_KEY,
      keys,
    ]);
  }

  function resetStoreKey(...keys: string[]) {
    ipcRenderer.callMain(IPC_NAMES.HANDLE_STORE, [
      IPC_TYPES.HANDLE_STORE.RESET_KEY,
      keys,
    ]);
  }

  async function hasStoreKey(key: string) {
    const data = await ipcRenderer.callMain(IPC_NAMES.HANDLE_STORE, [
      IPC_TYPES.HANDLE_STORE.HAS_KEY,
      key,
    ]);
    return data;
  }

  return {
    getStoreKey,
    clearStore,
    deleteStoreKey,
    resetStoreKey,
    hasStoreKey,
    setStoreKey,
  };
}
