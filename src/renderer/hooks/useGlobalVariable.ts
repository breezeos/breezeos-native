import { IPC_NAMES, IPC_TYPES } from "@/common/constants/ipc";
import { useMutation, useQuery } from "react-query";
import { type GlobalVariableType } from "@/common/types";

export default function useGlobalVariable() {
  const handleGlobalVariableName = IPC_NAMES.HANDLE_GLOBAL_VARIABLE;
  const handleGlobalVariableType = IPC_TYPES.HANDLE_GLOBAL_VARIABLE;
  const { data, isLoading } = useQuery({
    queryKey: ["global-variable-data"],
    queryFn: async () => {
      return await window.electronApi
        .callMain(handleGlobalVariableName, [
          handleGlobalVariableType.GET_ALL_VARIABLES,
        ])
        .then((storeData) => storeData as GlobalVariableType);
    },
    refetchOnWindowFocus: false,
  });
  const { mutate } = useMutation({
    mutationFn: (params: {
      ipcType: keyof typeof handleGlobalVariableType;
      value?: unknown;
    }) => {
      return window.electronApi.callMain(handleGlobalVariableName, [
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
    isGlobalVariableLoading: isLoading,
    getVariable,
    setVariable,
  };
}
