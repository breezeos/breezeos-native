import { create } from "zustand";
import { combine } from "zustand/middleware";
import generateId from "@r/utils/generateId";

type DialogType = "critical" | "exclamation" | "info" | "question";

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

const dialogState: State = {
  dialogs: [],
};

const useDialog = create<State & Actions>(
  combine(
    dialogState,
    (set): Actions => ({
      createDialog: (props) => {
        const id = generateId();
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
