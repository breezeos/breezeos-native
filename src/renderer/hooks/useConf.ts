import { useEffect, useState } from "react";

export default function useConf() {
  const [confData, setConfData] = useState<Record<string, unknown>>({});

  useEffect(() => {
    window.electron.ipcRenderer.on("store-data", (_e, data) => {
      setConfData(data);
    });
  }, []);

  function setConf(key: string, data: unknown) {
    window.electron.ipcRenderer.invoke("handle-store", "SET_KEY", key, data);
  }

  function clearConf() {
    window.electron.ipcRenderer.invoke("handle-store", "CLEAR_KEY");
  }

  function deleteConf(key: string) {
    window.electron.ipcRenderer.invoke("handle-store", "DELETE_KEY", key);
  }

  function resetConf(key: string) {
    window.electron.ipcRenderer.invoke("handle-store", "RESET_KEY", key);
  }

  function hasConf(key: string) {
    if (Object.prototype.hasOwnProperty.call(confData, key)) return true;

    return false;
  }

  return {
    confData,
    setConf,
    clearConf,
    deleteConf,
    resetConf,
    hasConf,
  };
}
