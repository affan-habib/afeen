import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import { useDispatch } from 'react-redux';
import { setCanvasState, resetAddRectangle } from '../store/pagesSlice';

const CanvasPage = ({ page }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const fabricCanvas = new fabric.Canvas(canvasElement, {
      backgroundColor: '#ffffff',
      selection: true,
      preserveObjectStacking: true,
      width: 400,
      height: 400,
    });

    fabricCanvasRef.current = fabricCanvas;

    if (page.canvasState) {
      fabricCanvas.loadFromJSON(page.canvasState, fabricCanvas.renderAll.bind(fabricCanvas));
    }

    const saveCanvasState = () => {
      const json = fabricCanvas.toJSON();
      dispatch(setCanvasState({ pageId: page.id, canvasState: json }));
    };

    fabricCanvas.on('object:added', saveCanvasState);
    fabricCanvas.on('object:modified', saveCanvasState);
    fabricCanvas.on('object:removed', saveCanvasState);

    return () => {
      fabricCanvas.off('object:added', saveCanvasState);
      fabricCanvas.off('object:modified', saveCanvasState);
      fabricCanvas.off('object:removed', saveCanvasState);
      fabricCanvas.dispose();
    };
  }, [dispatch, page.id, page.canvasState]);

  useEffect(() => {
    if (page.addRectangle) {
      const fabricCanvas = fabricCanvasRef.current;
      if (fabricCanvas) {
        const rect = new fabric.Rect({
          left: fabricCanvas.getWidth() / 2 - 100,
          top: fabricCanvas.getHeight() / 2 - 75,
          fill: 'rgba(255, 0, 0, 0.5)',
          width: 200,
          height: 150,
          selectable: true,
        });
        fabricCanvas.add(rect);
        fabricCanvas.renderAll();

        dispatch(resetAddRectangle(page.id));
      }
    }
  }, [page.addRectangle, page.id, dispatch]);

  return (
    <div className="w-400 h-400 bg-white border rounded shadow relative flex justify-center items-center mt-20">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default CanvasPage;