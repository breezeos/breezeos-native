import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface StateType {
  active: boolean;
}

const initialState: StateType = {
  active: false,
};

const touchbarSlice = createSlice({
  name: 'touchbar',
  initialState,
  reducers: {
    setTouchbarActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
  },
});

export const { setTouchbarActive } = touchbarSlice.actions;

export default touchbarSlice.reducer;
