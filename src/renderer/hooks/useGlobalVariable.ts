import { ipcRenderer } from "electron-better-ipc";
import { IPC_NAMES, IPC_TYPES } from "@/common/constants/ipcNames";
import { useMutation, useQuery } from "react-query";
import { GlobalVariableType } from "@/common/types";

export default function useGlobalVariable() {
  const handleGlobalVariableName = IPC_NAMES.HANDLE_GLOBAL_VARIABLE;
  const handleGlobalVariableType = IPC_TYPES.HANDLE_GLOBAL_VARIABLE;
  const { data } = useQuery({
    queryKey: ["global-variable-data"],
    queryFn: async () => {
      return ipcRenderer
        .callMain(handleGlobalVariableName, [
          handleGlobalVariableType.GET_ALL_VARIABLES,
        ])
        .then((storeData) => storeData as GlobalVariableType);
    },
  });
  const { mutate } = useMutation({
    mutationFn: (params: {
      ipcType: keyof typeof handleGlobalVariableType;
      value?: unknown;
    }) => {
      return ipcRenderer.callMain(handleGlobalVariableName, [
        params.ipcType,
        params.value,
      ]);
    },
  });

  function getVariable<T = unknown>(key: keyof GlobalVariableType) {
    if (data) return data[key] as T;
  }

  function setVariable(params: Record<string, unknown>) {
    mutate({
      ipcType: "SET_VARIABLES",
      value: params,
    });
  }

  return {
    getVariable,
    setVariable,
  };
}
