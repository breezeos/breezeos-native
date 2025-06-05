import { create } from "zustand";
import { combine } from "zustand/middleware";
import sequences from "@/data/sequences.json";

interface State {
  sequences: Record<string, any>;
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
  sequences,
  currentSequence: {
    sequence: Object.keys(sequences)[0],
    sequenceIndex: 0,
  },
};

const useSetupSequence = create<State & Actions>(
  combine(
    currentState,
    (set): Actions => ({
      setCurrentSequence: (sequence) =>
        set((state) => ({
          ...state,
          currentSequence: { sequence, sequenceIndex: 0 },
        })),
      nextSequence: () =>
        set((state) => ({
          ...state,
          currentSequence: {
            sequence: state.currentSequence.sequence,
            sequenceIndex: state.currentSequence.sequenceIndex + 1,
          },
        })),
      prevSequence: () =>
        set((state) => ({
          ...state,
          currentSequence: {
            sequence: state.currentSequence.sequence,
            sequenceIndex: state.currentSequence.sequenceIndex - 1,
          },
        })),
    }),
  ),
);

export default useSetupSequence;
