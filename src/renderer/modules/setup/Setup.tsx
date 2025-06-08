import { AnimatePresence } from "framer-motion";
import { useSetupSequence, useStore } from "@r/hooks";
import { Welcome, SetupBackground } from "@r/layouts/setup";
import * as sequenceLayout from "@r/layouts/setup/sequences";
import DialogProvider from "@r/layouts/DialogProvider";
import { SetupLayoutProvider } from "@r/contexts/SetupLayoutContext";

function Sequences() {
  const { sequences, currentSequence } = useSetupSequence();
  const sequenceOrder = Object.keys(sequences[currentSequence.sequence]);
  const currentSequenceIndex = currentSequence.sequenceIndex;
  const currentSequenceName = sequenceOrder[currentSequenceIndex];
  const Sequence =
    sequenceLayout[currentSequenceName as keyof typeof sequenceLayout];

  return sequences ? <Sequence /> : null;
}

export default function Setup() {
  const { getStoreItem } = useStore();
  const isFirstTimeOpened = getStoreItem<boolean>("isFirstTimeOpened");

  return (
    <DialogProvider>
      <div className="absolute h-full w-full bg-orange-50">
        <SetupLayoutProvider>
          <SetupBackground />
          <div className="absolute inset-0 grid h-full place-items-center">
            <AnimatePresence mode="wait">
              {isFirstTimeOpened ? <Welcome /> : <Sequences />}
            </AnimatePresence>
          </div>
        </SetupLayoutProvider>
      </div>
    </DialogProvider>
  );
}
