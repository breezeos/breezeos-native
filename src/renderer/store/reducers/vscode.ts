import { createSlice } from "@reduxjs/toolkit";

interface StateType {
  url: string;
}

const initialState: StateType = {
  url: "",
};

const vscodeSlice = createSlice({
  name: "vscode",
  initialState,
  reducers: {
    openUrl: (state) => {
      state.url = "https://vscode.dev";
    },
    closeUrl: (state) => {
      state.url = "";
    },
  },
});

export const { openUrl, closeUrl } = vscodeSlice.actions;

export default vscodeSlice.reducer;
