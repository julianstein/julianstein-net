import { configureStore } from '@reduxjs/toolkit';

import navReducer from './lib/slices/navSlice';
import windowReducer from './lib/slices/windowSlice';

export default configureStore({
  reducer: {
    showNav: navReducer,
    windowWidth: windowReducer
  },
  devTools: true
});
