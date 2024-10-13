import React, { useEffect } from 'react';
import { fabric } from 'fabric';

const PreviewDisplay = ({ canvasData }) => {
  useEffect(() => {
    const canvas = new fabric.Canvas('previewCanvas');
    canvas.loadFromJSON(canvasData, canvas.renderAll.bind(canvas));
  }, [canvasData]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Preview</h2>
      <div className="border border-gray-300 p-2">
        <canvas id="previewCanvas" width="800" height="600" />
      </div>
    </div>
  );
};

export default PreviewDisplay;
