import { ReactNode, createContext, useEffect, useState } from "react";
import { useStore, useGlobalVariable } from "../hooks";

export const LoadingContext = createContext(true);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isStoreLoading } = useStore();
  const { isGlobalVariableLoading } = useGlobalVariable();

  useEffect(() => {
    if (!isStoreLoading && !isGlobalVariableLoading) {
      setIsLoading(false);
    }
  }, [isStoreLoading, isGlobalVariableLoading]);

  return (
    <LoadingContext.Provider value={isLoading}>
      {children}
    </LoadingContext.Provider>
  );
}
