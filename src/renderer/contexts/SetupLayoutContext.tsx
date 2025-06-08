import {
  animate,
  cubicBezier,
  MotionValue,
  useMotionValue,
} from "framer-motion";
import { createContext, ReactNode, useCallback, useMemo } from "react";
import { useStore } from "../hooks";

interface SetupLayoutContextType {
  backgroundWidth: MotionValue<number>;
  setBackgroundShrink: () => void;
}

export const SetupLayoutContext = createContext<SetupLayoutContextType | null>(
  null,
);

const defaultWidth = window.innerWidth;
const shrankedWidth = window.innerWidth / 2 - 80;
const easingGraph = cubicBezier(0.17, 0.67, 0.53, 0.99);

export function SetupLayoutProvider({ children }: { children: ReactNode }) {
  const { getStoreItem } = useStore();
  const isFirstTimeOpened = getStoreItem<boolean>("isFirstTimeOpened");
  const backgroundWidth = useMotionValue(
    isFirstTimeOpened ? defaultWidth : shrankedWidth,
  );

  const setBackgroundShrink = useCallback(() => {
    animate(backgroundWidth, shrankedWidth, {
      duration: 0.8,
      ease: easingGraph,
    });
  }, [backgroundWidth]);

  const contextValue = useMemo(
    () => ({ backgroundWidth, setBackgroundShrink }),
    [backgroundWidth, setBackgroundShrink],
  );

  return (
    <SetupLayoutContext.Provider value={contextValue}>
      {children}
    </SetupLayoutContext.Provider>
  );
}
