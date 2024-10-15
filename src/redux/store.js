// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import canvasReducer from './canvasSlice';

export const store = configureStore({
    reducer: {
        canvas: canvasReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable state check for fabric.js objects
        }),
});

export default store;
