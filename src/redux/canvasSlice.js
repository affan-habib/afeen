// redux/canvasSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    canvas: null,
    selectedObject: null,
    groupSelection: null,
    modalOpen: false,
    toolbarProperties: {
        alignment: 'left',
        color: '#000000',
        fontSize: 16,
        text: '', // For managing text content
        fill: '#000000', // Fill color for objects
    },
};

// Load saved state from localStorage if it exists
const savedState = localStorage.getItem('canvasState');
if (savedState) {
    initialState.canvasState = JSON.parse(savedState);
}

const canvasSlice = createSlice({
    name: 'canvas',
    initialState,
    reducers: {
        setCanvas: (state, action) => {
            state.canvas = action.payload;
        },
        setSelectedObject: (state, action) => {
            state.selectedObject = action.payload;
        },
        setGroupSelection: (state, action) => {
            state.groupSelection = action.payload;
        },
        setModalOpen: (state, action) => {
            state.modalOpen = action.payload;
        },
        updateToolbarProperty: (state, action) => {
            const { property, value } = action.payload;
            state.toolbarProperties[property] = value;
        },
        updateObjectProperty: (state, action) => {
            const { property, value } = action.payload;
            if (state.selectedObject) {
                state.selectedObject.set(property, value);
                state.canvas.renderAll();
            }
        },
        updateGroupProperty: (state, action) => {
            const { property, value } = action.payload;
            if (state.groupSelection) {
                state.groupSelection.forEach((obj) => obj.set(property, value));
                state.canvas.renderAll();
            }
        },
        persistCanvasState: (state) => {
            if (state.canvas) {
                const canvasJSON = state.canvas.toJSON();
                localStorage.setItem('canvasState', JSON.stringify(canvasJSON));
            }
        },
        loadCanvasState: (state) => {
            const savedCanvas = localStorage.getItem('canvasState');
            if (savedCanvas && state.canvas) {
                state.canvas.loadFromJSON(savedCanvas, () => {
                    state.canvas.renderAll();
                });
            }
        },
    },
});

export const {
    setCanvas,
    setSelectedObject,
    setGroupSelection,
    setModalOpen,
    updateToolbarProperty,
    updateObjectProperty,
    updateGroupProperty,
    persistCanvasState,
    loadCanvasState,
} = canvasSlice.actions;

export default canvasSlice.reducer;
