import { IPC_NAMES, IPC_TYPES } from "@/common/constants/ipc";
import { useMutation, useQuery } from "react-query";
import { type StoreConfigKey } from "@/common/types";

type StoreConfigObjectType = Record<StoreConfigKey, unknown>;

export default function useStore() {
  const handleStoreName = IPC_NAMES.HANDLE_STORE;
  const handleStoreType = IPC_TYPES.HANDLE_STORE;
  const { data, isLoading } = useQuery({
    queryKey: ["store-data"],
    queryFn: async () => {
      return await window.electronApi
        .callMain(handleStoreName, [handleStoreType.GET_ALL_ITEMS])
        .then((storeData) => storeData as StoreConfigObjectType);
    },
    refetchOnWindowFocus: false,
  });
  const { mutate } = useMutation({
    mutationFn: (params: {
      ipcType: keyof typeof handleStoreType;
      value?: unknown;
    }) => {
      return window.electronApi.callMain(handleStoreName, [
        params.ipcType,
        params.value,
      ]);
    },
  });

  function getStoreItem<T = unknown>(key: StoreConfigKey) {
    if (data) return data[key] as T;
  }

  function setStoreItems(params: Record<string, unknown>) {
    mutate({
      ipcType: "SET_ITEMS",
      value: params,
    });
  }

  function resetAllStoreItems() {
    mutate({ ipcType: "RESET_ALL_ITEMS" });
  }

  function deleteStoreItems(...keys: string[]) {
    mutate({
      ipcType: "DELETE_ITEMS",
      value: keys,
    });
  }

  function resetStoreItems(...keys: string[]) {
    mutate({
      ipcType: "RESET_ITEMS",
      value: keys,
    });
  }

  function hasStoreItem(key: string) {
    if (data) return Object.prototype.hasOwnProperty.call(data, key);
  }

  return {
    isStoreLoading: isLoading,
    getStoreItem,
    resetAllStoreItems,
    deleteStoreItems,
    resetStoreItems,
    hasStoreItem,
    setStoreItems,
  };
}
