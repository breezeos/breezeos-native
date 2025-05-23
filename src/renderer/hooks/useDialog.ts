import { create } from "zustand";
import { combine } from "zustand/middleware";
import { DialogType } from "../../types";

interface State {
  readonly type?: {
    id: string;
    message?: string;
    type?: DialogType;
    important?: boolean;
    buttons?: {
      label: string;
      action?: () => void;
    }[];
  };
  dialogs: State["type"][];
}

interface Actions {
  createDialog: (props: Omit<State["type"], "id">) => void;
  updateDialog: (id: string, props: State["type"]) => void;
  removeDialog: (id: string) => void;
  clearDialog: () => void;
}

const state: State = {
  dialogs: [],
};

function genId() {
  let count = 0;
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const useDialog = create<State & Actions>(
  combine(
    state,
    (set): Actions => ({
      createDialog: (props) => {
        const id = genId();
        set((state) => ({ dialogs: [...state.dialogs, { ...props, id }] }));
      },
      updateDialog: (id, props) =>
        set((state) => ({
          dialogs: state.dialogs.map((i) =>
            i?.id === id ? { ...i, ...props } : i,
          ),
        })),
      removeDialog: (id) =>
        set((state) => ({
          dialogs: state.dialogs.filter((i) => i?.id !== id),
        })),
      clearDialog: () => set({ dialogs: [] }),
    }),
  ),
);
export default useDialog;
