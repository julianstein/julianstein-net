import { configureStore } from '@reduxjs/toolkit';

import navReducer from './lib/slices/navSlice';

export default configureStore({
  reducer: {
    showNav: navReducer
  },
  devTools: true
});
