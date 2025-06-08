import { useMutation, useQuery } from "react-query";
import { IPC_NAMES, IPC_TYPES } from "@/constants/ipc";
import { type GlobalVariableType } from "@/types";

export default function useGlobalVariable() {
  const handleGlobalVariableName = IPC_NAMES.HANDLE_GLOBAL_VARIABLE;
  const handleGlobalVariableType = IPC_TYPES.HANDLE_GLOBAL_VARIABLE;
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["global-variable-data"],
    queryFn: async () => {
      const globalVariables = await window.electronApi
        .callMain(handleGlobalVariableName, [
          handleGlobalVariableType.GET_ALL_VARIABLES,
        ])
        .then((storeData) => storeData as GlobalVariableType);
      return globalVariables;
    },
    refetchOnWindowFocus: true,
    onError: (err) => console.error(err),
  });
  const { mutate } = useMutation({
    mutationFn: (payload: {
      ipcType: keyof typeof handleGlobalVariableType;
      value?: unknown;
    }) => {
      return window.electronApi.callMain(handleGlobalVariableName, [
        payload.ipcType,
        payload.value,
      ]);
    },
  });

  function getVariable<T = unknown>(key: keyof GlobalVariableType) {
    if (data) return data[key] as T;
  }

  function setVariable(payload: Record<string, unknown>) {
    mutate({
      ipcType: "SET_VARIABLES",
      value: payload,
    });
    refetch();
  }

  return {
    isGlobalVariableLoading: isLoading,
    getVariable,
    setVariable,
  };
}
