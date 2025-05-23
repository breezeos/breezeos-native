import { create } from "zustand";
import { combine } from "zustand/middleware";

type SequencesType = typeof import("../window/setup/sequences");

interface State {
  sequences: {
    preinstall: Record<string, string[]>;
    postinstall: {};
  };
  currentSequence: {
    sequence: string;
    sequenceIndex: number;
  };
  importantSequence?: SequencesType;
  data: string[];
}

interface Actions {
  initializeSequence: () => void;
  setSequence: (sequence: string) => void;
  nextSequence: () => void;
  prevSequence: () => void;
  overrideCurrentSequence: (
    importantSequence: State["importantSequence"],
  ) => void;
  clearData: () => void;
  insertData: (data: State["data"]) => void;
  // deleteData: (data: string) => void;
}

const currentState: State = {
  sequences: {
    preinstall: {
      language: ["Language"],
      basic_setup: ["WiFi"],
    },
    postinstall: {},
  },
  currentSequence: {
    sequence: "language",
    sequenceIndex: 0,
  },
  data: [],
};

export function getData(key: string) {
  for (let i = 0; i < currentState.data.length; i++) {
    const splitStr = currentState.data[i].split(":");
    for (let j = 0; j < splitStr.length; j++) {
      if (splitStr[0] === key) return splitStr[1];
    }
  }
  return null;
}

const useSetup = create<State & Actions>(
  combine(
    currentState,
    (set): Actions => ({
      initializeSequence: () => {
        window.electron.ipcRenderer.on("load-sequences", (_e, result) => {
          set({
            sequences: result,
            currentSequence: {
              sequence: Object.keys(currentState.sequences.preinstall)[0],
              sequenceIndex: 0,
            },
          });
        });
      },
      setSequence: (sequence) =>
        set(() => ({ currentSequence: { sequence, sequenceIndex: 0 } })),
      nextSequence: () =>
        set((state) => ({ currentSequence: {
          sequence: state.currentSequence.sequence,
          sequenceIndex: state.currentSequence.sequenceIndex + 1,
        } })),
      prevSequence: () =>
        set((state) => ({ currentSequence: {
          sequence: state.currentSequence.sequence,
          sequenceIndex: state.currentSequence.sequenceIndex - 1,
        }})),
      overrideCurrentSequence: (importantSequence) =>
        set({ importantSequence }),
      clearData: () => set({ data: [] }),
      insertData: (data) => {
        if (data.length >= 2) {
          return data;
        }
        const str = `${data[0]}:${data.slice(1)}`;
        return set((state) => ({ data: [...state.data, str] }));
      },
      // deleteData: (data) =>
      //   set((state) => {
      //     for (let i = 0; i < state.data.length; i++) {
      //       const splitStr = state.data[i].split(":");
      //       for (let j = 0; j < splitStr.length; j++) {
      //         if (splitStr.includes(data) && splitStr[0] === data) {
      //           return state.data.splice(j);
      //         }
      //       }
      //     }
      //   }),
    }),
  ),
);

export default useSetup;
