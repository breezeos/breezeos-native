import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Apps } from '../../../types';

interface StateType extends Apps {
  location: string;
}

const initialState: StateType = {
  active: false,
  hide: false,
  location: '',
};

const textEditorSlice = createSlice({
  name: 'appsTextEditor',
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
    setHide: (state, action: PayloadAction<boolean>) => {
      state.hide = action.payload;
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
  },
});

export const { setActive, setHide, setLocation } = textEditorSlice.actions;

export default textEditorSlice.reducer;
