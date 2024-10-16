// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import pagesReducer from './pagesSlice';

const store = configureStore({
  reducer: {
    pages: pagesReducer,
  },
});

export default store;
