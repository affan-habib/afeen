import { createSlice } from '@reduxjs/toolkit';

// Create a slice for the active tool
const toolSlice = createSlice({
  name: 'tool',
  initialState: {
    activeTool: null,
  },
  reducers: {
    setActiveTool(state, action) {
      state.activeTool = action.payload;
    },
  },
});

// Export the action
export const { setActiveTool } = toolSlice.actions;

// Export the reducer
export default toolSlice.reducer;
