import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface StateType {
  active: boolean;
}

const initialState: StateType = {
  active: false
};

const setupSlice = createSlice({
  name: 'setup',
  initialState,
  reducers: {
    setSetupActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
  },
});

export const { setSetupActive } = setupSlice.actions;

export default setupSlice.reducer;
