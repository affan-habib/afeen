import { configureStore } from '@reduxjs/toolkit';
import toolReducer from './toolSlice';

// Create the Redux store
const store = configureStore({
  reducer: {
    tool: toolReducer,
  },
});

export default store;
