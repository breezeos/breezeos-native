import { create } from "zustand";
import { combine } from "zustand/middleware";

interface State {
  title: string;
  desc?: string;
  isLoading?: boolean;
  flexEndButtons?: {
    label: string;
    action: () => void;
  };
  scrollDisabled?: boolean;
  interactionsDisabled?: boolean;
}

interface Actions {
  setTitle: (title: string) => void;
  setDesc: (desc: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setFlexEndButtons: (flexEndButtons: State["flexEndButtons"]) => void;
  setDisableScroll: (scrollDisabled: boolean) => void;
  setDisableInteractions: (interactionsDisabled: boolean) => void;
  resetSequence: () => void;
}

const state: State = {
  title: "",
};

const useSequence = create<State & Actions>(
  combine(
    state,
    (set): Actions => ({
      setTitle: (title) => set({ title }),
      setDesc: (desc) => set({ desc }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setFlexEndButtons: (flexEndButtons) => set({ flexEndButtons }),
      setDisableScroll: (scrollDisabled) => set({ scrollDisabled }),
      setDisableInteractions: (interactionsDisabled) =>
        set({ interactionsDisabled }),
      resetSequence: () => set(state),
    }),
  ),
);

export default useSequence;
