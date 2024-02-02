import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  fullscreen: boolean;
  size: number[];
}

const initialState: StateType = {
  fullscreen: false,
  size: [],
};

const desktopSlice = createSlice({
  name: "window",
  initialState,
  reducers: {
    setFullscreen: (state, action: PayloadAction<boolean>) => {
      state.fullscreen = action.payload;
    },
    setSize: (state, action: PayloadAction<number[]>) => {
      state.size = action.payload;
    },
  },
});

export const { setFullscreen, setSize } = desktopSlice.actions;

export default desktopSlice.reducer;
