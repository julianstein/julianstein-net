import { createSlice } from '@reduxjs/toolkit';

const windowSlice = createSlice({
  name: 'windowWidth',
  initialState: {
    value: null
  },
  reducers: {
    width: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const selectWindow = (state) => state.windowWidth.value;

export const { width } = windowSlice.actions;

export default windowSlice.reducer;
