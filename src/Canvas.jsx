import React, { useEffect } from "react";

import { fabric } from "fabric";

import { useDispatch } from 'react-redux';

import { setActiveCanvasIndex } from './store/pagesSlice';



const Canvas = React.memo(({ index, canvas, currentScale, isActive }) => {

    const dispatch = useDispatch();

    const baseWidth = 800;

    const baseHeight = 600;



    useEffect(() => {

        const canvasElement = document.getElementById(`fabric-canvas-${index}`);

        if (canvasElement) {

            canvas.initialize(canvasElement, {

                width: baseWidth,

                height: baseHeight,

            });

            canvas.setViewportTransform([currentScale, 0, 0, currentScale, 0, 0]);

            canvas.renderAll();

        }

    }, [canvas, currentScale, index]);



    return (

        <div

            className={`border-4 ${isActive ? 'border-blue-500' : 'border-gray-300'}`}

            onClick={() => dispatch(setActiveCanvasIndex(index))}

            style={{

                width: `${baseWidth}px`,

                height: `${baseHeight}px`,

                transform: `scale(${currentScale})`,

                transformOrigin: 'top left',

            }}

        >

            <canvas id={`fabric-canvas-${index}`}></canvas>

        </div>

    );

});



export default Canvas;


