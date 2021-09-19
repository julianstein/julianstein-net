import { configureStore } from '@reduxjs/toolkit';

import navReducer from './lib/slices/navSlice';
import windowReducer from './lib/slices/windowSlice';
import { loadState } from './lib/sessionStorage';

const preloadedState = loadState();

const store = configureStore({
    reducer: {
        showNav: navReducer,
        windowWidth: windowReducer,
    },
    devTools: true,
    preloadedState,
});

export default store;
