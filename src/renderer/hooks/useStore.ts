import { useMutation, useQuery } from "react-query";
import { IPC_NAMES, IPC_TYPES } from "@/constants/ipc";
import { type StoreConfigKey } from "@/types";

type StoreConfigObjectType = Record<StoreConfigKey, unknown>;

export default function useStore() {
  const handleStoreName = IPC_NAMES.HANDLE_STORE;
  const handleStoreType = IPC_TYPES.HANDLE_STORE;
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["store-data"],
    queryFn: async () => {
      const storeItems = await window.electronApi
        .callMain(handleStoreName, [handleStoreType.GET_ALL_ITEMS])
        .then((storeData) => storeData as StoreConfigObjectType);
      return storeItems;
    },
    refetchOnWindowFocus: "always",
    cacheTime: 0,
    onError: (err) => console.error(err),
  });
  const { mutate } = useMutation({
    mutationFn: (payload: {
      ipcType: keyof typeof handleStoreType;
      value?: unknown;
    }) => {
      return window.electronApi.callMain(handleStoreName, [
        payload.ipcType,
        payload.value,
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
    refetch();
    console.log("Store items updated:", params);
  }

  function resetAllStoreItems() {
    mutate({ ipcType: "RESET_ALL_ITEMS" });
    refetch();
  }

  function deleteStoreItems(...keys: string[]) {
    mutate({
      ipcType: "DELETE_ITEMS",
      value: keys,
    });
    refetch();
  }

  function resetStoreItems(...keys: string[]) {
    mutate({
      ipcType: "RESET_ITEMS",
      value: keys,
    });
    refetch();
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
