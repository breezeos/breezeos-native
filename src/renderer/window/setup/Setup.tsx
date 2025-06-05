import { AnimatePresence, motion, useMotionValue } from "framer-motion";
// import { animate } from "framer-motion";
import WallpaperUrl from "@r/assets/images/wallpaper.jpg";
import useSetupSequence from "@r/hooks/useSetupSequence";
import useStore from "@r/hooks/useStore";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
// } from "@r/components/ui/DropdownMenu";
import Welcome from "@/renderer/layouts/setup/Welcome";
import * as sequenceLayout from "./index";
import { useEffect } from "react";

export default function App() {
  const { sequences, currentSequence, setCurrentSequence } = useSetupSequence();
  const { getStoreItem } = useStore();
  const isFirstTimeOpened = getStoreItem<boolean>("isFirstTimeOpened");
  const currentSequenceName = currentSequence.sequence;
  const currentSequenceIndex = currentSequence.sequenceIndex;
  const backgroundWidth = useMotionValue(832);

  return (
    <div className="absolute h-full w-full bg-orange-50">
      <motion.div
        className="grid h-full items-center rounded-lg bg-cover bg-center"
        style={{
          backgroundImage: `url(${WallpaperUrl})`,
          width: backgroundWidth,
        }}
      >
        <AnimatePresence mode="wait">
          {isFirstTimeOpened ? (
            <Welcome />
          ) : (
            sequences &&
            (sequenceLayout as Record<string, any>)[
              currentSequence.sequence
            ]?.map((step: string) => {
              const Sequence = step;
              return <Sequence key={Math.random()} />;
            })
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
