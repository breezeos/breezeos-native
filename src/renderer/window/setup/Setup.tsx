import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import WallpaperUrl from "@r/assets/images/wallpaper.jpg";
import { useSetupSequence, useStore } from "@r/hooks";
import Welcome from "@/renderer/layouts/setup/Welcome";
import * as sequenceLayout from "./sequences";

function renderSequences() {
  const { sequences, currentSequence } = useSetupSequence();
  const sequenceOrder = Object.keys(sequences[currentSequence.sequence]);
  const currentSequenceIndex = currentSequence.sequenceIndex;
  const currentSequenceName = sequenceOrder[currentSequenceIndex];
  const Sequence =
    sequenceLayout[currentSequenceName as keyof typeof sequenceLayout];

  return sequences && <Sequence key={Math.random()} />;
}

export default function Setup() {
  const { getStoreItem } = useStore();
  const isFirstTimeOpened = getStoreItem<boolean>("isFirstTimeOpened");
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
          {isFirstTimeOpened ? <Welcome /> : renderSequences()}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
