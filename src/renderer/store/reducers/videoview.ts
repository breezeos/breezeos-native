import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
  location: string;
}

const initialState: StateType = {
  location: "",
};

const videoViewSlice = createSlice({
  name: "videoView",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
  },
});

export const { setLocation } = videoViewSlice.actions;

export default videoViewSlice.reducer;
