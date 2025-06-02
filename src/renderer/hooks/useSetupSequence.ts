import { create } from "zustand";
import { combine } from "zustand/middleware";

interface State {
  currentSequence: {
    sequence: string;
    sequenceIndex: number;
  };
}

interface Actions {
  setCurrentSequence: (sequence: string) => void;
  nextSequence: () => void;
  prevSequence: () => void;
}

const currentState: State = {
  currentSequence: {
    sequence: "",
    sequenceIndex: 0,
  },
};

const useSetupSequence = create<State & Actions>(
  combine(
    currentState,
    (set): Actions => ({
      setCurrentSequence: (sequence) =>
        set(() => ({ currentSequence: { sequence, sequenceIndex: 0 } })),
      nextSequence: () =>
        set((state) => ({
          currentSequence: {
            sequence: state.currentSequence.sequence,
            sequenceIndex: state.currentSequence.sequenceIndex + 1,
          },
        })),
      prevSequence: () =>
        set((state) => ({
          currentSequence: {
            sequence: state.currentSequence.sequence,
            sequenceIndex: state.currentSequence.sequenceIndex - 1,
          },
        })),
    }),
  ),
);

export default useSetupSequence;
