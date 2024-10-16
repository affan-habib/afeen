import { createSlice } from '@reduxjs/toolkit';

let nextPageId = 1;

const pagesSlice = createSlice({
  name: 'pages',
  initialState: {
    pages: [
      {
        id: nextPageId,
        name: `Page ${nextPageId}`,
        canvasState: null,
        addRectangle: false,
      },
    ],
    selectedPageId: nextPageId,
  },
  reducers: {
    addPage: (state) => {
      nextPageId += 1;
      state.pages.push({
        id: nextPageId,
        name: `Page ${nextPageId}`,
        canvasState: null,
        addRectangle: false,
      });
      state.selectedPageId = nextPageId;
    },
    selectPage: (state, action) => {
      state.selectedPageId = action.payload;
    },
    setCanvasState: (state, action) => {
      const { pageId, canvasState } = action.payload;
      const page = state.pages.find((p) => p.id === pageId);
      if (page) {
        page.canvasState = canvasState;
      }
    },
    triggerAddRectangle: (state, action) => {
      const pageId = action.payload;
      const page = state.pages.find((p) => p.id === pageId);
      if (page) {
        page.addRectangle = true;
      }
    },
    resetAddRectangle: (state, action) => {
      const pageId = action.payload;
      const page = state.pages.find((p) => p.id === pageId);
      if (page) {
        page.addRectangle = false;
      }
    },
  },
});

export const { addPage, selectPage, setCanvasState, triggerAddRectangle, resetAddRectangle } = pagesSlice.actions;
export default pagesSlice.reducer;