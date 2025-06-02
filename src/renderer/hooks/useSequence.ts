import { create } from "zustand";
import { combine } from "zustand/middleware";
import FluentIcon from "@fluentui/react-icons/lib";

interface State {
  title: string;
  desc?: string;
  icon: keyof typeof FluentIcon;
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
  setDescription: (desc: string) => void;
  setIcon: (icon: State["icon"]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setFlexEndButtons: (flexEndButtons: State["flexEndButtons"]) => void;
  setDisableScroll: (scrollDisabled: boolean) => void;
  setDisableInteractions: (interactionsDisabled: boolean) => void;
  resetSequence: () => void;
}

const state: State = {
  title: "",
  icon: "GlobeRegular",
};

const useSequence = create<State & Actions>(
  combine(
    state,
    (set): Actions => ({
      setTitle: (title) => set({ title }),
      setDescription: (desc) => set({ desc }),
      setIcon: (icon) => set({ icon }),
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
