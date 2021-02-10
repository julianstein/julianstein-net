import { createSlice } from '@reduxjs/toolkit';

const navSlice = createSlice({
  name: 'showNav',
  initialState: {
    value: 'website'
  },
  reducers: {
    toggle: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const selectNav = (state) => state.showNav.value;

export const { toggle } = navSlice.actions;

export default navSlice.reducer;
