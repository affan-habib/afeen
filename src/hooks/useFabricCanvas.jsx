// useFabricCanvas.js
import { useState, useEffect } from 'react';
import { fabric } from 'fabric';

const useFabricCanvas = () => {
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const initCanvas = new fabric.Canvas('canvas', {
      width: 816,
      height: 1056,
      backgroundColor: '#ffffff',
    });
    setCanvas(initCanvas);

    // Clean up on unmount
    return () => {
      initCanvas.dispose();
    };
  }, []);

  return canvas;
};

export default useFabricCanvas;
