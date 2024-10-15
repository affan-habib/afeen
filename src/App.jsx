// App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fabric } from 'fabric';
import { setCanvas, setSelectedObject, persistCanvasState, loadCanvasState } from './redux/canvasSlice';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import CustomControls from './components/CustomControls';

function App() {
    const dispatch = useDispatch();
    const canvas = useSelector((state) => state.canvas.canvas);

    useEffect(() => {
        // Initialize the fabric.js canvas
        const canvasInstance = new fabric.Canvas('fabricCanvas');
        dispatch(setCanvas(canvasInstance));

        // Load the saved canvas state from localStorage
        dispatch(loadCanvasState());

        // Add a sample rectangle to the canvas for demonstration purposes
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 100,
            height: 100,
        });
        canvasInstance.add(rect);

        // Event listener for object selection
        canvasInstance.on('selection:created', (e) => {
            dispatch(setSelectedObject(e.target));
        });

        // Persist the canvas state when the component unmounts
        return () => {
            dispatch(persistCanvasState());
            canvasInstance.dispose();
        };
    }, [dispatch]);

    return (
        <div className="h-screen flex flex-col items-center justify-center">
            <h1 className="text-xl mb-4">Fabric.js Editor with Redux Toolkit</h1>
            <div className="flex">
                <canvas id="fabricCanvas" className="border" width={800} height={600}></canvas>
                <CustomControls />
            </div>
        </div>
    );
}

export default function RootApp() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}
