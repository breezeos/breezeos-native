import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface StateType {
  url: string;
  searchEngine: string;
}

const initialState: StateType = {
  url: '',
  searchEngine: 'Google',
};

const surfaceSlice = createSlice({
  name: 'surface',
  initialState,
  reducers: {
    openUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    closeUrl: (state) => {
      state.url = '';
    },
    setSearchEngine: (state, action: PayloadAction<string>) => {
      state.searchEngine = action.payload;
    },
  },
});

export const { openUrl, closeUrl, setSearchEngine } = surfaceSlice.actions;

export default surfaceSlice.reducer;
